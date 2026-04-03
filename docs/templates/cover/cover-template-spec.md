# Cover Slide — Spec

**Template:** Cover  
**Data:** 2026-04-02  
**Status:** Design aprovado — pronto para implementação  
**Versão:** 3.0 — Split layout + Fade suave (Light theme)

---

## Objetivo

Slide de abertura do carousel. Atrai atenção no feed do LinkedIn, comunica o tema do conteúdo e apresenta o autor. Usa layout split horizontal: conteúdo textual à esquerda, foto do autor à direita com fade suave de transição.

---

## Formatos suportados

| Formato | Dimensões | Prop `format` |
|---------|-----------|---------------|
| Square | 1080 × 1080 px | `"square"` |
| Vertical | 1080 × 1350 px | `"vertical"` |

---

## Layout

```
┌─────────────────────────────────────────────────┐
│                                                 │
│  [CONTEÚDO — 68%]      [FOTO — 52% da direita]  │
│                        ·                        │
│  ─ OVERLINE            · ← fade suave           │
│                        ·                        │
│  HEADLINE em           ████████████████████     │
│  DM Sans 700           ████████████████████     │
│  com palavra           ████████████████████     │
│  em orange             ████████████████████     │
│                        ████████████████████     │
│  ─── accent bar        ████████████████████     │
│                        ████████████████████     │
│  Subtítulo             ████████████████████     │
│                                                 │
│  [tag] [tag] [tag]                              │
│                                                 │
│  allan victor  |  01 / 08                       │
└─────────────────────────────────────────────────┘
```

A foto ocupa 52% a partir da borda direita. O conteúdo usa 68% a partir da borda esquerda — há sobreposição intencional coberta pelo fade. O fade começa na borda esquerda da foto e dissolve até transparente na borda direita.

---

## Props

```typescript
interface CoverSlideProps {
  format?: SlideFormat          // "square" | "vertical" — default: "square"
  overline: string              // Ex: "IA · AGENTES · SDK"
  headline: string              // Ex: "Construindo Agentes de IA que funcionam"
  highlightWords?: string[]     // Palavras da headline em --primary-500
  subtitle: string              // 1-2 frases descritivas
  tags?: string[]               // Ex: ["#IA", "#Agentes", "#SDK"]
  authorPhoto?: string          // URL/path da foto — obrigatória no design v3
  currentSlide: number
  totalSlides: number
}
```

---

## Especificação visual

### Estrutura de camadas (z-index)

| Camada | z-index | Elemento |
|--------|---------|----------|
| 0 | base | Background `--bg-primary` |
| 1 | foto | `<img>` foto do autor |
| 2 | fade | Overlay gradiente de transição |
| 3 | conteúdo | Overline, headline, subtitle, tags |
| 4 | footer | Nome + paginação |

---

### Foto

- **Posição:** `absolute`, `top: 0`, `right: 0`
- **Largura:** 52% do slide
- **Altura:** 100%
- **Fit:** `object-fit: cover`, `object-position: center top` (foca no rosto)

---

### Fade overlay

Cobre a mesma área da foto (52% direita). Gradiente horizontal suave de `--bg-primary` até transparente:

```css
background: linear-gradient(
  to right,
  #FAF8F3 0%,        /* --bg-primary — opaco */
  #faf8f3e6 15%,     /* 90% opacidade */
  #faf8f3bf 30%,     /* 75% */
  #faf8f380 45%,     /* 50% */
  #faf8f340 60%,     /* 25% */
  #faf8f320 75%,     /* 12% */
  #faf8f310 85%,     /* 6% */
  transparent 100%
);
```

A progressão é deliberadamente suave para evitar corte visual entre texto e foto.

---

### Painel de conteúdo

- **Posição:** `absolute`, `top: 0`, `left: 0`
- **Largura:** 68%
- **Padding square:** `80px 72px`
- **Padding vertical:** `96px 80px`
- **Alinhamento vertical:** `justify-content: center`

---

### Overline

| Propriedade | Valor |
|-------------|-------|
| Font | JetBrains Mono 500 |
| Tamanho | 14px |
| Transform | uppercase |
| Letter-spacing | 0.28em |
| Cor | `--primary-400` (#FF7A45) |
| Margin-bottom | 28px |
| Barra decorativa | 3px × 20px, `--primary-500`, border-radius 2px |
| Gap barra→texto | 12px |

---

### Headline

| Propriedade | Valor |
|-------------|-------|
| Font | DM Sans 700 |
| Tamanho square | 72px |
| Tamanho vertical | 84px |
| Line-height | 1.05 |
| Cor | `--text-primary` (#141414) |
| Margin-bottom | 24px |
| `highlightWords` | `--primary-500` (#FF6B00) |

---

### Accent bar

| Propriedade | Valor |
|-------------|-------|
| Largura | 64px |
| Altura | 5px |
| Background | `linear-gradient(90deg, #FF6B00, #FF8A3D)` |
| Border-radius | 3px |
| Margin-bottom | 28px |

---

### Subtitle

| Propriedade | Valor |
|-------------|-------|
| Font | Inter 400 |
| Tamanho | 20px |
| Line-height | 1.6 |
| Cor | `--text-secondary` (#5C5A56) |
| Max-width | 480px |
| Margin-bottom | 36px |

---

### Tags

| Propriedade | Valor |
|-------------|-------|
| Font | Inter 600 |
| Tamanho | 13px |
| Padding | 6px 16px |
| Border-radius | 9999px |
| Gap | 10px |
| Primeiro tag | `background: rgba(255,107,0,0.12)`, `color: --primary-500` |
| Demais tags | `background: rgba(20,20,20,0.07)`, `color: --text-secondary` |

---

### Footer

- **Posição:** `absolute`, `bottom: 48px`, `left: 72px`
- **Layout:** `nome | separador | paginação`

| Elemento | Font | Tamanho | Cor |
|----------|------|---------|-----|
| Nome | JetBrains Mono 500 | 13px | `--text-muted` |
| Separador | — | 1px × 16px | `rgba(255,107,0,0.25)` |
| Paginação | JetBrains Mono 500 | 13px | `--text-muted` |

Formato da paginação: `01 / 08` (zero-padded).

---

## Cores utilizadas

Todos os tokens mapeados para `src/index.css`:

| Token | Hex | Uso |
|-------|-----|-----|
| `--bg-primary` | `#FAF8F3` | Background do slide, fade base |
| `--bg-secondary` | `#F5F3EE` | (reservado para variações) |
| `--primary-500` | `#FF6B00` | Overline bar, highlight words, tag primary |
| `--primary-400` | `#FF7A45` | Overline text, accent bar ponta |
| `--primary-300` | `#FF8A3D` | Accent bar ponta clara |
| `--text-primary` | `#141414` | Headline |
| `--text-secondary` | `#5C5A56` | Subtitle, tags secundárias |
| `--text-muted` | `#9A9790` | Footer nome e paginação |

---

## Tipografia

| Elemento | Font | Tamanho (square) | Tamanho (vertical) | Peso |
|----------|------|-------------------|--------------------|------|
| Overline | JetBrains Mono | 14px | 14px | 500 |
| Headline | DM Sans | 72px | 84px | 700 |
| Subtitle | Inter | 20px | 22px | 400 |
| Tags | Inter | 13px | 13px | 600 |
| Footer | JetBrains Mono | 13px | 13px | 500 |

---

## Decisões de design

1. **Split com fade (não divider rígido)** — cria elegância editorial, foto tem presença sem competir com o texto
2. **Foto 52% / Conteúdo 68%** — sobreposição deliberada preenchida pelo fade; garante que o texto não encoste na borda esquerda da foto
3. **`object-position: center top`** — prioriza o rosto sobre qualquer enquadramento vertical
4. **Fade com 8 stops lineares** — dissolução suave sem salto visual no ponto de transição
5. **Overline em JetBrains Mono** — contraste tipográfico com DM Sans no headline; reforça identidade técnica
6. **Footer discreto em `--text-muted`** — presente mas não compete com o conteúdo principal

---

## Arquivos

| Arquivo | Descrição |
|---------|-----------|
| `spec.md` | Este documento |
| `mockup.html` | Mockup HTML estático com foto real, tamanho 1080×1080 |
| `cover-v2-legacy.md` | Spec da versão anterior (fullscreen photo + cyberpunk) |

---

## Próximos passos

- Implementar `CoverSlide.tsx` seguindo esta spec
- Atualizar `SLIDE-TEMPLATES.md` com referência a esta pasta
- Testar export PNG via `html-to-image` com pixelRatio 2
