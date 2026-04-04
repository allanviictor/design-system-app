# AVM Slides — Tech Spec

**Versão:** 1.0 (v3 Brand)
**Última atualização:** 2026-04-01

---

## Stack

| Camada | Tecnologia | Versão | Justificativa |
|--------|------------|--------|---------------|
| Build Tool | Vite | 6.x | Startup instantâneo, HMR rápido, zero config |
| Framework | React | 19.x | Componentização, ecossistema |
| Linguagem | TypeScript | 5.x | Type safety |
| Styling | Tailwind CSS | 4.x | Utility-first, produtividade |
| Componentes UI | shadcn/ui | latest | Base para controles |
| Design Tokens | CSS Custom Properties | — | Nativo, sem runtime |
| Syntax Highlight | Shiki | 3.x | Highlighting em build |
| Fonts | Google Fonts | — | DM Sans, Inter, JetBrains Mono |

---

## Arquitetura

```
┌─────────────────────────────────────────────┐
│  Browser (localhost:5173)                    │
│                                             │
│  ┌───────────┐    ┌──────────────────────┐  │
│  │ Controls  │    │   SlideCanvas        │  │
│  │           │    │   (1080×1080)        │  │
│  │ - Theme   │───▶│                      │  │
│  │ - Navigate│    │   [CoverSlide]       │  │
│  │           │    │                      │  │
│  └───────────┘    └──────────────────────┘  │
│                                             │
│              CSS Custom Properties           │
│         (Design Tokens v1 — Light)          │
│                                             │
└─────────────────────────────────────────────┘
```

### Fluxo de Dados

```
Carousel Data (array de slides)
       │
       ▼
  App.tsx (state: slideIndex)
       │
       ├──▶ Controls (navegação, tema)
       │
       └──▶ SlideCanvas
                │
                └──▶ CoverSlide Component
                        │
                        └──▶ Shared Components (Overline, Tag)
                                │
                                └──▶ CSS Custom Properties (design tokens)
```

---

## Estrutura do Projeto

Arquitetura feature-based. Cada feature é auto-contida; `shared/` guarda o que é reutilizado.

```
src/
├── features/
│   ├── canvas/
│   │   └── SlideCanvas.tsx                 # Container 1080×1080
│   └── slides/
│       ├── templates/
│       │   └── CoverSlide.tsx              # Template de capa (v1)
│       └── types/
│           └── index.ts                    # Slide, Carousel types
├── shared/
│   ├── components/
│   │   ├── ui/                             # shadcn/ui (gerado, kebab-case)
│   │   ├── AccentBar.tsx
│   │   ├── BgShape.tsx
│   │   ├── CodeBlock.tsx
│   │   ├── Overline.tsx
│   │   ├── Pagination.tsx
│   │   ├── SlideFooter.tsx
│   │   └── Tag.tsx
│   ├── enums/
│   │   └── slide-format.ts                 # SlideFormat enum + SLIDE_DIMENSIONS
│   └── utils/
│       └── highlight.tsx                   # Helper highlight (função pura)
├── lib/
│   ├── utils.ts                            # cn() helper
│   ├── ThemeProvider.tsx                   # Context tema light/dark/system
│   ├── avm-theme.ts                        # Tema Shiki
│   └── shiki.ts                            # Singleton highlighter
├── posts/
│   └── piloto-testes/
│       └── index.ts                        # Carousel data
├── App.tsx
├── main.tsx
└── index.css                               # Design tokens v1
```

### Regras de Import e Nomeação

- Cross-feature: sempre `@/` absoluto
- Dentro de features: relativo preferencialmente
- Sem barrel files — importar direto do arquivo
- shadcn/ui: geram em `@/shared/components/ui/` (kebab-case, não renomear)
- **Componentes React (`.tsx`):** PascalCase — `ThemeProvider.tsx`, `SlideCanvas.tsx`
- **Módulos não-componentes (`.ts`):** kebab-case — `slide-format.ts`, `avm-theme.ts`
- **Types e interfaces:** PascalCase — `CoverSlide`, `Carousel`, `SlideFormat`

---

## Detalhes de Implementação

### 1. SlideCanvas

Container que renderiza slides no tamanho exato.

```typescript
interface SlideCanvasProps {
  children: React.ReactNode;
  format?: SlideFormat  // "square" | "vertical" — default: "square"
  className?: string;
  id?: string;
}

// Dimensões via SLIDE_DIMENSIONS[format]
// Square:   1080 × 1080
// Vertical: 1080 × 1350

// No browser: renderiza em 50% scale para caber na tela
// CSS: transform: scale(0.5);
```

**Estratégia de escala:** O canvas renderiza no tamanho real (1080px) e é escalado via `transform: scale()` para preview. Assim a proporção visível é realista.

### 2. Design Tokens (CSS Custom Properties)

Arquivo `src/index.css` define todos os tokens:

```css
:root {
  /* Tipografia */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-heading: 'DM Sans', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Primary — Orange Quente */
  --primary-700: #CC4A00;
  --primary-600: #E55A00;
  --primary-500: #FF6B00;  /* base */
  --primary-400: #FF7A45;
  --primary-300: #FF8A3D;

  /* Background — Off-White Warm */
  --bg-primary: #FAF8F3;   /* base */
  --bg-secondary: #F5F3EE;
  --bg-tertiary: #F0EDE8;
  --bg-light: #FEFDFB;

  /* Text — Dark */
  --text-primary: #141414;
  --text-secondary: #5C5A56;
  --text-muted: #9A9790;

  /* Aliases */
  --accent-primary: var(--primary-500);
  --accent-light: var(--primary-300);
  --accent-dark: var(--primary-600);
}
```

### 3. Syntax Highlighting com Shiki

```typescript
// lib/avm-theme.ts
export const avmTheme = {
  name: 'avm-light',
  colors: {
    'editor.background': '#FAF8F3',
    'editor.foreground': '#141414',
  },
  tokenColors: [
    { scope: 'keyword', settings: { foreground: '#FF6B00' } },
    { scope: 'string', settings: { foreground: '#008A78' } },
    // ... demais tokens
  ],
};
```

### 4. Dados do Carousel

```typescript
// types/index.ts
interface CoverSlide {
  type: 'cover';
  overline: string;
  headline: string;
  highlightWords?: string[];
  subtitle: string;
  tags?: string[];
  authorPhoto?: string;
}

type Slide = CoverSlide;  // v1: apenas Cover

interface Carousel {
  title: string;
  slides: Slide[];
  format: 'square';  // v1: apenas square
}
```

```typescript
// posts/piloto-testes/index.ts
export const pilotoTestes: Carousel = {
  title: 'Programação com Agentes de IA',
  format: 'square',
  slides: [
    {
      type: 'cover',
      overline: 'IA · AGENTES · SDK',
      headline: 'Programação com Agentes de IA',
      highlightWords: ['Agentes'],
      subtitle: 'Como LLMs com ferramentas estão mudando a forma de construir software',
      tags: ['IA', 'Agentes', 'LLM', 'TypeScript'],
      authorPhoto: 'url-da-foto.jpg',
    },
  ],
};
```

---

## Setup Inicial

```bash
# 1. Instalar dependências
npm install

# 2. Tailwind CSS (já configurado)
npm install tailwindcss @tailwindcss/vite

# 3. shadcn/ui (para UI controls)
npx shadcn@latest init

# 4. Dependências core
npm install shiki

# 5. Rodar dev server
npm run dev
```

---

## Google Fonts Loading

Incluir em `index.css`:

```css
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap");
```

---

## Workflow do MVP

```
1. Allan abre o projeto: npm run dev
2. Edita arquivo em src/posts/piloto-testes/index.ts
3. Browser mostra preview em tempo real (hot reload)
4. Ajusta conteúdo, headlines, tags
5. Itera até estar satisfeito visualmente
6. Conteúdo pronto para usar/customizar
```

---

## Decisões Técnicas e Trade-offs

| Decisão | Alternativa | Por que essa |
|---------|-------------|--------------|
| Vite (não Next.js) | Next.js, CRA | Projeto local, sem SSR |
| CSS Custom Properties | styled-components | Zero runtime, simples |
| Tema Light Only | Light + Dark | MVP foca em light primeiro |
| Vertical + Square | Single format | Ambos os formatos suportados via `SlideFormat` enum |
| Sem Exportação | html-to-image | Foco em design primeiro |
| Dados em TS | JSON, CMS | Type-safe, autocomplete |

---

## Limitações Conhecidas

1. **Um template:** Apenas Cover implementado. Content, Code, Comparison, Closing em iterações futuras.
2. **Sem persistência:** Dados vivem no código. Perder arquivo = perder conteúdo. Use git.
3. **Sem exportação:** Visualização apenas. PNG export via `html-to-image` (pendente).
4. **Sem dark theme:** Light theme apenas no canvas. Dark theme em iteração futura.

---

## Próximas Iterações

- **v1.1:** Exportação PNG
- **v1.2:** Demais templates (Content, Code, etc.)
- **v1.3:** Formato vertical (1080×1350)
- **v2.0:** Dark theme, integração Claude API
