# AVM Slides — Slide Templates Specification

**Versão:** 1.0
**Última atualização:** 25/03/2026

---

## Visão Geral

Cada template é um componente React que recebe props de conteúdo e renderiza dentro de um `SlideCanvas`. Todos compartilham os mesmos tokens de design.

### Componentes Compartilhados

| Componente | Função |
|------------|--------|
| `SlideCanvas` | Container com dimensões fixas (1080×1350 ou 1080×1080), background, shapes decorativos |
| `Overline` | Categoria do slide (uppercase, letter-spacing, `--text-muted`) |
| `AccentBar` | Barra gradiente horizontal de 48×4px |
| `Pagination` | Indicador "01 / 08" no canto inferior direito |
| `Footer` | Assinatura "allan victor" no canto inferior esquerdo (slides internos) |
| `CodeBlock` | Bloco de código com syntax highlighting, badges de linguagem, números de linha |
| `Tag` | Badge com label (ex: "React", "TypeScript") |
| `Card` | Container com background `--bg-secondary`, borda sutil, radius `--radius-lg` |
| `BgShape` | Elipse/blob gradiente decorativo posicionado em absolute |

---

## Template 1: Capa (Cover Slide)

**Propósito:** Primeiro slide do carousel. Atrai atenção no feed e comunica o tema.

### Hierarquia Visual
```
┌─────────────────────────────────────┐
│                                     │
│  OVERLINE (categoria)               │
│                                     │
│  HEADLINE                           │
│  com palavra em                     │
│  destaque laranja                   │
│  ─── (accent bar)                   │
│                                     │
│  Subtítulo descritivo em 1-2 linhas │
│  explicando o que será abordado     │
│                                     │
│                                     │
│                                     │
│  [tag1] [tag2] [tag3]               │
│                                     │
│                            01 / 08  │
└─────────────────────────────────────┘
```

### Props
```typescript
interface CoverSlideProps {
  overline: string;          // Ex: "REACT · HOOKS"
  headline: string;          // Ex: "Por que useEffect quebra seu app"
  highlightWords?: string[]; // Palavras da headline que ficam em laranja
  subtitle: string;          // 1-2 frases descritivas
  tags?: string[];           // Ex: ["React", "Hooks", "Performance"]
  currentSlide: number;
  totalSlides: number;
}
```

### Regras
- Headline usa `--text-display` (56px) no vertical, `--text-h1` (42px) no quadrado
- Palavras em `highlightWords` renderizam com `color: var(--accent-primary)`
- AccentBar aparece logo abaixo da headline
- Tags no bottom, acima da paginação
- BgShape decorativo no canto superior direito (elipse com accent-glow, blur alto)
- Textura glitch sutil pode ser aplicada no background deste slide (opacity 0.03-0.05)

---

## Template 2: Conteúdo (Content Slide)

**Propósito:** Slide padrão para explicação textual. O "workhorse" do carousel.

### Hierarquia Visual
```
┌─────────────────────────────────────┐
│                                     │
│  OVERLINE (seção/tópico)            │
│                                     │
│  Headline do slide                  │
│  ─── (accent bar)                   │
│                                     │
│  Parágrafo de conteúdo principal    │
│  com explicação clara e direta.     │
│  Pode ter múltiplos parágrafos.     │
│                                     │
│  Texto complementar em cor          │
│  secundária se necessário.          │
│                                     │
│                                     │
│  footer                   01 / 08  │
└─────────────────────────────────────┘
```

### Props
```typescript
interface ContentSlideProps {
  overline?: string;
  headline: string;
  highlightWords?: string[];
  body: string | string[];     // Parágrafos
  footnote?: string;           // Texto complementar em cor secundária
  currentSlide: number;
  totalSlides: number;
}
```

### Regras
- Headline usa `--text-h1` (42px)
- Body usa `--text-body` (18px) com `--text-primary`
- Footnote usa `--text-body-sm` (16px) com `--text-secondary`
- Espaçamento entre parágrafos: `--space-6` (24px)
- Footer com assinatura discreta aparece neste template

---

## Template 3: Código (Code Slide)

**Propósito:** Slide para exibir código com syntax highlighting.

### Hierarquia Visual
```
┌─────────────────────────────────────┐
│                                     │
│  OVERLINE                           │
│                                     │
│  Headline explicando                │
│  o código abaixo                    │
│  ─── (accent bar)                   │
│                                     │
│  ┌─────────────────────────── js ┐  │
│  │ 1  const result = await       │  │
│  │ 2    fetch('/api/data')       │  │
│  │ 3    .then(r => r.json());    │  │
│  │ 4                             │  │
│  │ 5  // comentário              │  │
│  └───────────────────────────────┘  │
│                                     │
│  Explicação abaixo do código        │
│  (opcional)                         │
│                                     │
│  footer                   01 / 08  │
└─────────────────────────────────────┘
```

### Props
```typescript
interface CodeSlideProps {
  overline?: string;
  headline?: string;
  highlightWords?: string[];
  code: string;
  language: string;           // "javascript", "typescript", "html", "css", etc.
  highlightLines?: number[];  // Linhas para destacar com bg sutil
  showLineNumbers?: boolean;  // default: true
  caption?: string;           // Explicação abaixo do código
  currentSlide: number;
  totalSlides: number;
}
```

### Regras
- CodeBlock usa `--bg-code` como background
- Badge de linguagem no canto superior direito do bloco
- Números de linha em `--text-muted`
- Linhas destacadas têm background `rgba(232, 116, 42, 0.08)`
- Headline é opcional — pode ser só código com caption
- Máximo de linhas visíveis: ~15 (vertical) ou ~10 (quadrado)
- Se o código for maior, truncar com indicador "..."

---

## Template 4: Comparação (Comparison Slide)

**Propósito:** Comparar dois conceitos, abordagens, ou mostrar certo vs errado.

### Hierarquia Visual
```
┌─────────────────────────────────────┐
│                                     │
│  OVERLINE                           │
│                                     │
│  Headline de comparação             │
│  ─── (accent bar)                   │
│                                     │
│  ┌──────────┐    ┌──────────┐       │
│  │ Titulo A  │    │ Titulo B  │      │
│  │           │    │           │      │
│  │ Conteúdo  │    │ Conteúdo  │      │
│  │ do card   │    │ do card   │      │
│  │ esquerdo  │    │ direito   │      │
│  │           │    │           │      │
│  │ label     │    │ label     │      │
│  └──────────┘    └──────────┘       │
│                                     │
│  Conclusão ou observação            │
│                                     │
│  footer                   01 / 08  │
└─────────────────────────────────────┘
```

### Props
```typescript
interface ComparisonSlideProps {
  overline?: string;
  headline?: string;
  highlightWords?: string[];
  left: {
    title: string;
    body: string;
    label?: string;           // Ex: "eager evaluation"
    variant: 'success' | 'error' | 'warning' | 'neutral';
    code?: string;            // Código opcional dentro do card
    language?: string;
  };
  right: {
    title: string;
    body: string;
    label?: string;
    variant: 'success' | 'error' | 'warning' | 'neutral';
    code?: string;
    language?: string;
  };
  conclusion?: string;        // Texto abaixo dos cards
  currentSlide: number;
  totalSlides: number;
}
```

### Regras
- Cards lado a lado com gap de `--space-6`
- Cada card usa `--bg-secondary` como base
- Borda top do card com cor semântica:
  - `success`: borda verde (`--color-success`)
  - `error`: borda vermelha (`--color-error`)
  - `warning`: borda amarela (`--color-warning`)
  - `neutral`: borda `--border-subtle`
- Título do card em `--text-h3` (24px)
- Label no footer do card em `--text-caption` com JetBrains Mono
- Se tiver code, renderizar mini CodeBlock dentro do card
- Conclusão em `--text-body` com `--text-secondary`

---

## Template 5: Slide Final (Closing Slide)

**Propósito:** Encerramento do carousel com CTA e assinatura.

### Hierarquia Visual
```
┌─────────────────────────────────────┐
│                                     │
│                                     │
│                                     │
│         Allan Victor                │
│         ─── (accent bar)            │
│                                     │
│         Frase de CTA ou             │
│         conclusão do post           │
│                                     │
│         Curta · Comente · Salve     │
│                                     │
│         @handle                     │
│                                     │
│                                     │
│                                     │
│                            08 / 08  │
└─────────────────────────────────────┘
```

### Props
```typescript
interface ClosingSlideProps {
  authorName?: string;        // Default: "Allan Victor"
  cta: string;                // Ex: "Curtiu? Salva pra consultar depois."
  handle?: string;            // Ex: "@allanvictor"
  actions?: string[];         // Ex: ["Curta", "Comente", "Compartilhe"]
  currentSlide: number;
  totalSlides: number;
}
```

### Regras
- Conteúdo centralizado vertical e horizontalmente
- Nome do autor em `--text-h2` (32px) com Space Grotesk 600
- AccentBar centralizada abaixo do nome
- CTA em `--text-body` com `--text-secondary`
- Actions em `--text-caption` com separador " · "
- Handle em `--text-caption` com `--accent-primary`
- BgShape decorativo sutil (pode ter dois, um em cada canto)
- Sem footer (a assinatura É o conteúdo)

---

## Estrutura de Componentes (Árvore)

```
src/
├── components/
│   ├── canvas/
│   │   └── SlideCanvas.tsx       # Container com dimensões fixas
│   ├── shared/
│   │   ├── Overline.tsx
│   │   ├── AccentBar.tsx
│   │   ├── Pagination.tsx
│   │   ├── SlideFooter.tsx
│   │   ├── CodeBlock.tsx
│   │   ├── Tag.tsx
│   │   ├── Card.tsx
│   │   └── BgShape.tsx
│   └── templates/
│       ├── CoverSlide.tsx
│       ├── ContentSlide.tsx
│       ├── CodeSlide.tsx
│       ├── ComparisonSlide.tsx
│       └── ClosingSlide.tsx
├── styles/
│   ├── tokens.css               # CSS Custom Properties
│   └── code-theme.css           # Tema custom do syntax highlighting
├── lib/
│   ├── export.ts                # Lógica de exportação PNG
│   └── types.ts                 # Interfaces TypeScript
└── App.tsx                      # Preview + controles de exportação
```
