# AVM Slides — Tech Spec

**Versão:** 1.0
**Última atualização:** 25/03/2026

---

## Stack

| Camada | Tecnologia | Versão | Justificativa |
|--------|------------|--------|---------------|
| Build Tool | Vite | 6.x | Startup instantâneo, HMR rápido, zero config |
| Framework | React | 19.x | Componentização, ecossistema, familiaridade |
| Linguagem | TypeScript | 5.x | Type safety nas props dos templates |
| Styling | Tailwind CSS | 4.x | Utility-first, produtividade |
| Componentes UI | shadcn/ui | latest | Base para controles da ferramenta (botões, selects, etc.) |
| Design Tokens | CSS Custom Properties | — | Nativo, sem runtime, fácil de tematizar |
| Syntax Highlight | Shiki | 3.x | Highlighting no build, temas customizáveis, melhor que Prism |
| Exportação | html-to-image | 1.x | Converte DOM para PNG no browser |
| Fonts | Google Fonts | — | Space Grotesk, Inter, JetBrains Mono |

---

## Arquitetura

```
┌─────────────────────────────────────────────┐
│  Browser (localhost:5173)                    │
│                                             │
│  ┌───────────┐    ┌──────────────────────┐  │
│  │ Controls  │    │   SlideCanvas        │  │
│  │           │    │   (1080×1350 ou       │  │
│  │ - Format  │    │    1080×1080)         │  │
│  │ - Theme   │    │                      │  │
│  │ - Export  │───▶│   [Template]          │  │
│  │ - Navigate│    │                      │  │
│  │           │    │                      │  │
│  └───────────┘    └──────────┬───────────┘  │
│                              │              │
│                     html-to-image           │
│                              │              │
│                              ▼              │
│                        PNG 2x               │
│                   (salvo localmente)        │
└─────────────────────────────────────────────┘
```

### Fluxo de Dados

```
Carousel Data (array de slides)
       │
       ▼
  App.tsx (state: slideIndex, format)
       │
       ├──▶ Controls (navegação, formato, exportação)
       │
       └──▶ SlideCanvas
                │
                └──▶ Template Component (Cover, Content, Code, etc.)
                        │
                        └──▶ Shared Components (Overline, CodeBlock, Tag, etc.)
                                │
                                └──▶ CSS Custom Properties (tokens.css)
```

---

## Estrutura do Projeto

Arquitetura feature-based. Cada feature é auto-contida; `shared/` guarda o que é reutilizado entre features.

```
src/
├── features/
│   └── slides/                        # Feature de renderização de slides
│       ├── components/
│       │   ├── canvas/
│       │   │   └── SlideCanvas.tsx    # Container 1080×1080 ou 1080×1350
│       │   └── templates/
│       │       ├── CoverSlide.tsx
│       │       ├── ContentSlide.tsx
│       │       ├── CodeSlide.tsx
│       │       ├── ComparisonSlide.tsx
│       │       └── ClosingSlide.tsx
│       └── types/
│           └── index.ts               # Slide, Carousel, SlideFormat, etc.
├── shared/
│   ├── components/
│   │   ├── ui/                        # shadcn/ui (gerado via CLI)
│   │   │   └── button.tsx
│   │   ├── theme-provider.tsx
│   │   ├── AccentBar.tsx
│   │   ├── BgShape.tsx
│   │   ├── CodeBlock.tsx
│   │   ├── Overline.tsx
│   │   ├── Pagination.tsx
│   │   ├── SlideFooter.tsx
│   │   └── Tag.tsx
│   └── lib/
│       ├── avm-theme.ts               # Tema Shiki com cores da marca
│       ├── shiki.ts                   # Singleton do highlighter
│       └── highlight.tsx              # Helper de highlight de palavras
├── lib/
│   └── utils.ts                       # cn() — mantido aqui por shadcn
├── posts/
│   └── piloto-testes/
│       └── index.ts                   # Dados do carousel (título, slides[])
├── App.tsx
├── main.tsx
└── index.css                          # Design tokens + Shiki reset
```

### Regras de import

- Cross-feature e cross-layer: sempre `@/` absoluto
- Dentro de `features/slides`: relativo (ex: `../canvas/SlideCanvas`)
- Novos componentes shadcn: `npx shadcn@latest add <c>` → geram em `@/shared/components/ui/` (configurado em `components.json`)
- Sem barrel files (`index.ts` de re-export) — importar direto do arquivo fonte

---

## Detalhes de Implementação

### 1. SlideCanvas

O componente mais importante. Renderiza os slides no tamanho exato para exportação.

```typescript
// Conceito — não é código final
interface SlideCanvasProps {
  format: 'vertical' | 'square';
  children: React.ReactNode;
}

// Dimensões reais do slide
const DIMENSIONS = {
  vertical: { width: 1080, height: 1350 },
  square:   { width: 1080, height: 1080 },
};

// No browser, renderiza escalado (ex: 50%) para caber na tela
// Na exportação, renderiza em 1x e exporta em 2x via pixelRatio
```

**Estratégia de escala:** O canvas renderiza no tamanho real (1080px de largura) e é escalado via CSS `transform: scale()` para caber na viewport. Na hora de exportar, o html-to-image captura o elemento no tamanho real.

### 2. Exportação PNG

```typescript
// lib/export.ts
import { toPng } from 'html-to-image';

export async function exportSlide(
  element: HTMLElement,
  filename: string
): Promise<void> {
  // Aguardar fonts carregarem
  await document.fonts.ready;

  const dataUrl = await toPng(element, {
    pixelRatio: 2,        // 2x para alta resolução
    quality: 1.0,
    cacheBust: true,      // Evitar cache de imagens
    skipAutoScale: true,
  });

  // Trigger download
  const link = document.createElement('a');
  link.download = `${filename}.png`;
  link.href = dataUrl;
  link.click();
}
```

**Cuidados:**
- Fonts devem estar completamente carregadas antes de exportar (`document.fonts.ready`)
- `pixelRatio: 2` gera imagem 2160×2700 (vertical) ou 2160×2160 (quadrado)
- Gradientes e box-shadows podem ter inconsistências — testar no MVP

### 3. Syntax Highlighting com Shiki

```typescript
// lib/shiki.ts
import { createHighlighter } from 'shiki';

// Tema custom baseado nos tokens do design system
const avmTheme = {
  name: 'avm-dark',
  colors: {
    'editor.background': '#12121A',
  },
  tokenColors: [
    { scope: 'keyword', settings: { foreground: '#E8742A' } },
    { scope: 'string', settings: { foreground: '#8BBF65' } },
    { scope: 'comment', settings: { foreground: '#5C5A56' } },
    { scope: 'entity.name.function', settings: { foreground: '#5BA3D9' } },
    // ... demais tokens do DESIGN-SYSTEM.md
  ],
};

export async function initHighlighter() {
  return createHighlighter({
    themes: [avmTheme],
    langs: ['javascript', 'typescript', 'html', 'css', 'jsx', 'tsx', 'json', 'bash'],
  });
}
```

### 4. Dados do Carousel

```typescript
// lib/types.ts
type SlideType = 'cover' | 'content' | 'code' | 'comparison' | 'closing';

interface BaseSlide {
  type: SlideType;
  overline?: string;
}

interface CoverSlide extends BaseSlide {
  type: 'cover';
  headline: string;
  highlightWords?: string[];
  subtitle: string;
  tags?: string[];
}

// ... demais tipos (ver SLIDE-TEMPLATES.md)

type Slide = CoverSlide | ContentSlide | CodeSlide | ComparisonSlide | ClosingSlide;

interface Carousel {
  slides: Slide[];
  format: 'vertical' | 'square';
  theme: 'dark';  // 'light' no futuro
}
```

```typescript
// data/sample-carousel.ts
export const sampleCarousel: Carousel = {
  format: 'vertical',
  theme: 'dark',
  slides: [
    {
      type: 'cover',
      overline: 'REACT · PERFORMANCE',
      headline: 'Por que useEffect quebra seu app',
      highlightWords: ['useEffect'],
      subtitle: 'Entenda o ciclo de vida e evite re-renders desnecessários',
      tags: ['React', 'Hooks', 'Performance'],
    },
    {
      type: 'content',
      overline: 'O PROBLEMA',
      headline: 'useEffect roda após cada render.',
      highlightWords: ['cada render'],
      body: [
        'Quando você não passa um array de dependências, o useEffect executa depois de toda atualização do componente.',
        'Isso pode causar loops infinitos, chamadas HTTP duplicadas e problemas sérios de performance.',
      ],
    },
    // ... mais slides
    {
      type: 'closing',
      cta: 'Curtiu? Salva pra consultar depois.',
      handle: '@allanvictor',
      actions: ['Curta', 'Comente', 'Compartilhe'],
    },
  ],
};
```

---

## Setup Inicial (Comandos)

```bash
# 1. Criar projeto
npm create vite@latest avm-slides -- --template react-ts

# 2. Instalar dependências
cd avm-slides
npm install

# 3. Tailwind CSS
npm install tailwindcss @tailwindcss/vite

# 4. shadcn/ui (para controles da ferramenta)
npx shadcn@latest init

# 5. Dependências core
npm install html-to-image shiki

# 6. Rodar
npm run dev
```

---

## Google Fonts (Loading)

Incluir no `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

**Importante para exportação:** Fonts do Google Fonts carregam via CSS que referencia arquivos externos. O html-to-image pode ter problemas com isso. Se acontecer, auto-hospedar as fonts em `/public/fonts/` e usar `@font-face` local.

---

## Workflow do Dia a Dia

```
1. Allan quer criar um post
2. Abre o projeto: cd avm-slides && npm run dev
3. Cria/edita arquivo em src/data/ com o conteúdo do carousel
4. Browser mostra preview em tempo real (hot reload)
5. Navega entre slides, ajusta conteúdo
6. Alterna formato se necessário (vertical ↔ quadrado)
7. Exporta cada slide como PNG
8. Upload no LinkedIn como carousel (PDF ou imagens)
```

---

## Decisões Técnicas e Trade-offs

| Decisão | Alternativa | Por que essa |
|---------|-------------|--------------|
| Vite (não Next.js) | Next.js, CRA | Não precisa de SSR, projeto local |
| CSS Custom Properties (não CSS-in-JS) | styled-components, Emotion | Zero runtime, funciona com html-to-image |
| Shiki (não Prism) | Prism, highlight.js | Highlighting em build, temas como JSON, melhor qualidade |
| html-to-image (não Puppeteer) | Puppeteer, Playwright | Mais simples, roda no browser, sem deps de sistema |
| Tailwind (não CSS modules) | CSS modules, SCSS | Produtividade, utility-first, bom com tokens CSS |
| Dados como TS (não CMS) | JSON, MDX, Supabase | Type-safe, autocomplete, zero infra |

---

## Limitações Conhecidas

1. **html-to-image + fonts externas:** Pode falhar com Google Fonts CDN. Solução: auto-hospedar.
2. **html-to-image + gradientes complexos:** Gradientes radiais com blur podem não renderizar 100%. Testar e simplificar se necessário.
3. **Shiki bundle size:** Shiki com muitas linguagens pode pesar. Carregar apenas as linguagens necessárias.
4. **Sem persistência:** Dados vivem no código-fonte. Perder o arquivo = perder o conteúdo. Mitigação: git.
5. **Exportação manual:** Um slide por vez no MVP. V1.1 terá batch export.
