# Cover Slide — Plano de Implementação

**Template:** Cover  
**Data:** 2026-03-31  
**Status:** Implementado

---

## Objetivo

Substituir o layout single-column genérico do `CoverSlide.tsx` por um split 50/50 horizontal com identidade Cyberpunk Tech Editorial:  
conteúdo à esquerda, foto do autor à direita.

---

## Layout

```
┌─────────────────────────────────────────┐
│ BG: grid decorativo + grain + glow blobs│
│ ┌──────────────┬──┬─────────────────┐   │
│ │ LEFT 50%     │1px│ RIGHT 50%      │   │
│ │              │   │                │   │
│ │ [overline]   │   │  [FOTO]        │   │
│ │ [headline]   │   │  object-fit    │   │
│ │ [accentbar]  │   │  cover         │   │
│ │ [subtitle]   │   │                │   │
│ │ [tags]       │   │  + vignettes   │   │
│ │              │   │                │   │
│ │ [footer][pag]│   │                │   │
│ └──────────────┴───┴────────────────┘   │
└─────────────────────────────────────────┘
```

---

## Arquivos Modificados

| Arquivo | Mudança |
|---------|---------|
| `src/features/slides/types/index.ts` | Add `authorPhoto?: string` à interface `CoverSlide` |
| `src/features/slides/components/templates/CoverSlide.tsx` | Reescrita completa — split 50/50, inline styles |
| `src/posts/piloto-testes/index.ts` | Somente slide cover (limpeza), com `authorPhoto` real |

---

## Props do Componente

```typescript
interface CoverSlideProps extends CoverSlideData {
  format?: SlideFormat      // "vertical" | "square"
  currentSlide: number
  totalSlides: number
}

// CoverSlideData (types/index.ts):
interface CoverSlide extends BaseSlide {
  type: "cover"
  headline: string
  highlightWords?: string[]
  subtitle: string
  tags?: string[]
  authorPhoto?: string      // URL — placeholder se omitido
}
```

---

## Canvas Background

| Layer | Técnica | Valor |
|-------|---------|-------|
| Base | `SlideCanvas` bg | `--neutral-950` = `#080808` |
| Grid decorativo | `repeating-linear-gradient` | `rgba(255,85,0,0.04)` 40×40px |
| Grain | SVG inline `feTurbulence` + `filter: url(#grain)` | opacity 0.07 |
| Glow laranja | `BgShape position="bottom-left" color="orange" size={600}` | blob radial |
| Glow cyan | `BgShape position="top-right" color="cyan" size={400}` | blob radial |

---

## Left Column (50%)

- Padding: `8% vertical × 7% horizontal`
- Layout: `flexDirection: column`, content em `flex: 1` centralizado, bottom row fixo

| Elemento | Estilo-chave |
|----------|-------------|
| Overline | Barra `2px × 16px` em `--primary-500` + texto JetBrains Mono, `--primary-400`, `letter-spacing: 0.25em` |
| Headline | Orbitron 900, `--text-display` (vertical) / `--text-h1` (square), `highlightWords` → `--accent-primary` |
| Accent bar | `div` 54px × 3px, `background: --gradient-accent` |
| Subtitle | Inter 400, `--text-body-sm`, `--text-secondary`, `maxWidth: 90%` |
| Tags | `<Tag>` — first = primary, rest = secondary |
| Footer | JetBrains Mono, `--text-caption`, `--text-muted` — "allan victor" |
| Pagination | JetBrains Mono, `--text-caption`, `--text-muted` — "01 / 06" |

---

## Center Divider

```
width: 1px
height: 84%
alignSelf: center
background: linear-gradient(to bottom,
  transparent,
  rgba(255,85,0,0.3),
  rgba(0,229,200,0.2),
  transparent
)
```

---

## Right Column (flex: 1)

- Base: `backgroundColor: var(--secondary-900)` = `#0A2020`
- **Com foto:** `<img>` `object-fit: cover` + 3 overlay layers (vignette esquerda, vignette baixo, glow cyan top-right)
- **Sem foto (placeholder):** círculo dashed + ícone SVG + "SUA FOTO"

---

## Decisões Técnicas

| Decisão | Motivo |
|---------|--------|
| `Pagination` + `SlideFooter` → inline | Ambos hardcode `position: absolute` canvas-relative — não funcionam dentro da coluna |
| `AccentBar` → inline div | Componente não aceita `width`/`height` customizados |
| `Overline` → inline | Componente não suporta variante laranja com barra lateral |
| `BgShape` → reusado | Diferença de cor (`#FF6B00` vs `#FF5500`) é imperceptível a 12% opacity |
| Grain: inline SVG `<defs>` | Sem dependência externa; auto-contido no componente |

---

## Verificação

```bash
npm run dev        # localhost:5173 — visual check
npm run typecheck  # sem novos erros
```

Checklist visual:
- [ ] Split 50/50 visível
- [ ] Overline com barra laranja à esquerda
- [ ] Headline em Orbitron 900
- [ ] Accent bar gradiente abaixo do título
- [ ] Tags coloridas (primary + secondary)
- [ ] Footer + paginação no rodapé da coluna esquerda
- [ ] Coluna direita teal com placeholder ou foto
- [ ] Divisória gradiente visível
- [ ] Grid sutil no background
