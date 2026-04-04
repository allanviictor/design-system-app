# Brand & Design System — v1

**Data:** 2026-04-01
**Status:** Aprovado

---

## Contexto

AVM Slides é uma aplicação React para gerar carousel slides LinkedIn como exportações PNG. O design system define a identidade visual e tokens de design para toda a aplicação.

**Filosofia:** Minimalista + Moderno Editorial — clean, direto ao ponto, com personalidade através de tipografia elegante e cor quente suave.

---

## Direção Visual

**Estilo:** Minimalista + Moderno Editorial
**Tema:** Light (apenas light theme nesta versão)
**Peso Visual:** Identidade presente via tipografia sem-serifa com personalidade e cor primária marcante
**Composição:** Limpa, legível, pensada para slides LinkedIn

---

## Tipografia

### Fonte Primária — Headlines

**DM Sans** — 700 (bold)
- Uso: Títulos, headlines, elementos de destaque
- Carregamento: Google Fonts `family=DM+Sans:wght@700`
- Caráter: Editorial, versátil, elegante, humanista
- Razão: Equilibra modernidade com personalidade, lê bem em todos os tamanhos

### Fonte Secundária — Body & UI

**Inter** — 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- Uso: Corpo de texto, descrições, metadados, UI
- Carregamento: Google Fonts `family=Inter:wght@400;500;600;700`
- Caráter: Clean, altamente legível, neutra
- Razão: Máxima legibilidade e acessibilidade

### Fonte de Código

**JetBrains Mono** — 400 (regular), 500 (medium)
- Uso: Blocos de código, snippets, monospace contexts
- Carregamento: Google Fonts `family=JetBrains+Mono:wght@400;500`
- Caráter: Monoespacial, técnico, claro

### Implementação em CSS

```css
--font-sans: 'Inter', system-ui, sans-serif;
--font-heading: 'DM Sans', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

---

## Paleta de Cores

### Primary — Orange Quente

Cor de marca que transmite energia, calor e presença.

| Token | Hex | Peso | Papel |
|---|---|---|---|
| `--primary-700` | `#CC4A00` | Escuro | Disabled, dark variant |
| `--primary-600` | `#E55A00` | Médio Escuro | Pressed, active states |
| **`--primary-500`** | **`#FF6B00`** | **Base** | **Headlines, CTAs, accents** |
| `--primary-400` | `#FF7A45` | Médio Claro | Hover states |
| `--primary-300` | `#FF8A3D` | Claro | Highlights, decorativo |

**Cor Base:** `#FF6B00` — laranja quente, vibrante, marca presença sem ser agressivo

### Background — Off-White Warm

Backgrounds neutros e acessíveis que complementam a cor primária.

| Token | Hex | Papel |
|---|---|---|
| `--bg-light` | `#FEFDFB` | Subtle backgrounds, secundário |
| **`--bg-primary`** | **`#FAF8F3`** | **Base — Fundo dos slides** |
| `--bg-secondary` | `#F5F3EE` | Cards, elevated surfaces |
| `--bg-tertiary` | `#F0EDE8` | Hover, interactive surfaces |

**Cor Base:** `#FAF8F3` — off-white quente com tom cream

### Text — Dark/Neutral

Paleta de texto para máxima legibilidade em backgrounds light.

| Token | Hex | Papel |
|---|---|---|
| **`--text-primary`** | **`#141414`** | **Headlines, primary text** |
| `--text-secondary` | `#5C5A56` | Body text, descriptions |
| `--text-muted` | `#9A9790` | Metadata, secondary info, hints |

### Aliases Semânticos

Tokens mnemônicos que facilitam uso em componentes:

```css
/* Accent */
--accent-primary:   var(--primary-500);   /* #FF6B00 */
--accent-light:     var(--primary-300);   /* #FF8A3D */
--accent-dark:      var(--primary-600);   /* #E55A00 */
--accent-glow:      rgba(255, 107, 0, 0.12);

/* Background */
--bg-primary:       var(--bg-primary);    /* #FAF8F3 */
--bg-secondary:     var(--bg-secondary);  /* #F5F3EE */
--bg-tertiary:      var(--bg-tertiary);   /* #F0EDE8 */

/* Text */
--text-primary:     var(--text-primary);  /* #141414 */
--text-secondary:   var(--text-secondary); /* #5C5A56 */
--text-muted:       var(--text-muted);    /* #9A9790 */
```

---

## Espaçamento & Radius

### Espaçamento (Escala de 8px)

```css
--spacing-xs:  0.5rem;  /* 8px */
--spacing-sm:  1rem;    /* 16px */
--spacing-md:  1.5rem;  /* 24px */
--spacing-lg:  2rem;    /* 32px */
--spacing-xl:  3rem;    /* 48px */
--spacing-2xl: 4rem;    /* 64px */
```

### Border Radius

```css
--radius-sm:   4px;
--radius-md:   8px;
--radius-lg:   12px;
--radius-xl:   16px;
--radius-2xl:  24px;
--radius-full: 9999px;
```

---

## Dimensões dos Slides

### Suportados

| Formato | Dimensões | Uso |
|---|---|---|
| **Vertical** | 1080 × 1350px | LinkedIn carousel padrão |
| **Square** | 1080 × 1080px | Instagram, tweets, geral |

Slide canvas renderiza em tamanho real (1080px) e é escalado via `transform: scale()` para preview.

---

## Componentes & Padrões

### Estrutura de Componentes

```
src/
├── features/
│   ├── canvas/
│   │   └── SlideCanvas.tsx
│   └── slides/
│       ├── templates/
│       │   ├── CoverSlide.tsx
│       │   ├── ContentSlide.tsx
│       │   ├── CodeSlide.tsx
│       │   ├── ComparisonSlide.tsx
│       │   └── ClosingSlide.tsx
│       └── types/index.ts
├── shared/
│   ├── components/
│   │   ├── ui/                    (shadcn/ui — kebab-case filenames)
│   │   └── (AccentBar, BgShape, CodeBlock, Overline, Pagination, SlideFooter, Tag)
│   ├── enums/
│   │   └── slide-format.ts
│   └── utils/
│       └── highlight.tsx          (pure function — not a component)
└── lib/
    ├── utils.ts                   (cn() helper)
    ├── ThemeProvider.tsx          (light/dark/system theme context)
    ├── avm-theme.ts               (Shiki syntax highlight)
    └── shiki.ts                   (highlighter singleton)
```

### Estilo de Inline Styles em Templates

Slide templates usam **inline styles** (não Tailwind classes) porque `html-to-image` não processa classes. Padrão:

```tsx
<div style={{
  fontFamily: 'var(--font-heading)',
  fontSize: '52px',
  fontWeight: 700,
  color: 'var(--text-primary)',
  lineHeight: 1.1,
}}>
  Título do Slide
</div>
```

---

## Convenções de Código

### Imports

- **Path alias:** `@/` mapeia para `src/` — usar para imports cross-feature
- **Dentro de features:** imports relativos preferencialmente
- **Sem barrel files:** importar direto do arquivo fonte, não de `index.ts` re-exports

### shadcn/ui Components

Adicionar com: `npx shadcn@latest add <component>`

Gera em: `@/shared/components/ui/`

Merge classes com: `cn()` de `@/lib/utils`

### Tipografia & Temas

- **Slide canvas é sempre light** — tokens de marca (`--bg-primary`, etc.) definidos em `:root`
- **App UI segue tema** — light/dark via `theme-provider.tsx`
- Pressionar `d` para toggle tema

### Nomeação de Arquivos e Tipos

- **Componentes React (`.tsx`):** PascalCase — `SlideCanvas.tsx`, `ThemeProvider.tsx`, `AccentBar.tsx`
- **shadcn/ui:** kebab-case como gerado pelo CLI — `badge.tsx`, `button.tsx`
- **Módulos não-componentes (`.ts`):** kebab-case — `slide-format.ts`, `avm-theme.ts`, `utils.ts`
- **Types e interfaces:** PascalCase — `CoverSlide`, `Carousel`, `SlideFormat`

### Formatação

- **Prettier:** sem semicolons, double quotes, 2-space indent, trailing commas (ES5)
- **TypeScript:** strict mode, sem unused locals/params
- **ESLint:** run com `npm run lint`

---

## Arquivos Chave

| Arquivo | Responsabilidade |
|---|---|
| [src/index.css](../src/index.css) | Tokens de design, imports de fonte, reset Shiki |
| [src/lib/ThemeProvider.tsx](../src/lib/ThemeProvider.tsx) | Context tema light/dark/system |
| [src/lib/utils.ts](../src/lib/utils.ts) | `cn()` helper (clsx + tailwind-merge) |
| [src/shared/lib/avm-theme.ts](../src/shared/lib/avm-theme.ts) | Shiki theme customizado com cores marca |
| [docs/SLIDE-TEMPLATES.md](./SLIDE-TEMPLATES.md) | Specs de layout para cada template |
| [docs/TECH-SPEC.md](./TECH-SPEC.md) | Decisões arquiteturais, stack, limitações |

---

## Critérios de Sucesso

- ✅ Slides renderizam com DM Sans nos headlines
- ✅ Cor primária é `#FF6B00` (orange quente)
- ✅ Background padrão é `#FAF8F3` (off-white warm)
- ✅ Todos os aliases semânticos funcionam
- ✅ Templates não quebram com nova paleta
- ✅ `npm run build` passa sem erros
- ✅ Identidade visual alinha com minimalista + moderno editorial
- ✅ Composição é limpa e legível em todos os tamanhos

---

## Próximas Iterações

- Dark theme (light theme é prioritário agora)
- Paleta de cores secundária (se necessário)
- Ícones e ilustrações customizadas
- Animações e micro-interações
