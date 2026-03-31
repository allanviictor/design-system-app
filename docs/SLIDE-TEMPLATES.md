# AVM Slides — Slide Templates Specification

**Versão:** 2.0
**Última atualização:** 31/03/2026

---

## Visão Geral

Cada template é um componente React que recebe props de conteúdo e renderiza dentro de um `SlideCanvas`. Todos compartilham os mesmos tokens de design.

**Escopo atual:** apenas o template de Capa (Cover Slide) está especificado. Os demais templates serão definidos em iterações futuras.

### Componentes Compartilhados

| Componente | Função |
|------------|--------|
| `SlideCanvas` | Container com dimensões fixas (1080×1080), background, grain e grid decorativos |
| `Overline` | Categoria do slide (uppercase, letter-spacing, JetBrains Mono, `--text-muted`) |
| `AccentBar` | Barra gradiente horizontal de 48×3px |
| `Pagination` | Indicador "01 / 08" no canto inferior direito |
| `SlideFooter` | Assinatura "allan victor · @allanvictorm" no canto inferior esquerdo |
| `Tag` | Badge com label (ex: "IA", "SDK") |

---

## Template 1: Capa (Cover Slide)

**Propósito:** Slide de abertura. Atrai atenção no feed, comunica o tema e apresenta o autor.

### Layout

Split 50/50 horizontal — conteúdo à esquerda, foto à direita, separados por linha vertical sutil.

```
┌──────────────────────┬──────────────────────┐
│                      │                      │
│  ── OVERLINE         │                      │
│                      │                      │
│  HEADLINE            │                      │
│  com palavra         │      [FOTO]          │
│  em laranja          │                      │
│  ─── (accent bar)    │                      │
│                      │                      │
│  Subtítulo 1-2       │                      │
│  linhas              │                      │
│                      │                      │
│  [tag1] [tag2]       │                      │
│                      │                      │
│  footer       01/06  │                      │
└──────────────────────┴──────────────────────┘
```

### Estrutura de colunas

| Coluna | Largura | Conteúdo |
|--------|---------|----------|
| Esquerda | 50% | Overline, headline, accent bar, subtitle, tags, footer, paginação |
| Divisor | 1px | Linha vertical com gradiente `primary-500` → `secondary-500` |
| Direita | 50% | Foto do autor (com vignette nos cantos) |

### Props

```typescript
interface CoverSlideProps {
  overline: string;           // Ex: "IA · AGENTES · SDK"
  headline: string;           // Ex: "Programação com Agentes de IA"
  highlightWords?: string[];  // Palavras da headline em --primary-500
  subtitle: string;           // 1-2 frases descritivas
  tags?: string[];            // Ex: ["IA", "Agentes", "SDK"]
  authorPhoto?: string;       // URL da foto (opcional — mostra placeholder se omitido)
  currentSlide: number;
  totalSlides: number;
  format: SlideFormat;        // Square (1080×1080) apenas por ora
}
```

### Regras visuais

**Lado esquerdo:**
- Padding: 7% horizontal, 8% vertical
- Overline: barra vertical 2px `--primary-500` + texto JetBrains Mono, `--primary-400`, letter-spacing 0.25em, uppercase
- Headline: Orbitron 900, `--neutral-100`, palavras em `highlightWords` recebem `--primary-500`
- AccentBar: 10% da largura da coluna, gradiente `primary-500` → `primary-600`, 3px altura
- Subtitle: Inter 400, `--neutral-400`, font-size `--text-body-sm`, line-height 1.6
- Tags: primárias em `--primary-500` (bg rgba primary-500 10%), secundárias em `--secondary-400` (bg rgba secondary-500 6%), JetBrains Mono
- Footer e paginação: JetBrains Mono, `--neutral-500`

**Divisor:**
- Posição: `top: 8%`, `bottom: 8%`, `left: 50%`
- 1px de largura
- Gradiente vertical: `transparent → rgba(primary-500, 0.3) → rgba(secondary-500, 0.2) → transparent`

**Lado direito:**
- Fundo: `--secondary-900` como base
- Foto ocupa 100% do container
- Vignette da esquerda: `linear-gradient(to right, rgba(bg-primary, 0.5) 0%, transparent 30%)`
- Vignette inferior: `linear-gradient(to top, rgba(bg-primary, 0.7) 0%, transparent 25%)`
- Glow cyan sutil no canto superior: `radial-gradient(ellipse, rgba(secondary-500, 0.08))`
- Se `authorPhoto` não fornecido: exibe placeholder com ícone e texto "SUA FOTO"

**Fundo geral:**
- `--neutral-950` (`#080808`)
- Grid decorativo: `linear-gradient` 1px em `rgba(primary-500, 0.04)`, 40×40px
- Grain SVG: `feTurbulence`, opacity 7%
- Glow blob laranja: `radial-gradient` canto inferior esquerdo, `rgba(primary-500, 0.12)`
- Glow blob cyan: `radial-gradient` canto superior direito, `rgba(secondary-500, 0.08)`

### Nota de evolução

O layout Split 50/50 é a versão inicial. Ajustes visuais (proporção de colunas, tratamento da foto, elementos decorativos adicionais) serão feitos em iterações futuras após validação com foto real.
