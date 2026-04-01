# Cover Slide — Plano de Implementação

**Template:** Cover  
**Data:** 2026-04-01  
**Status:** Implementado  
**Versão:** 2.0 — Fullscreen Photo + Content Overlay

---

## Objetivo

Cover slide com foto em tela cheia + conteúdo sobreposto no canto inferior esquerdo. Inspirado em portfolio moderno com silhueta em iluminação quente (laranja/ouro). Identidade Cyberpunk Tech Editorial com Orbitron + Fogo + Elétrico.

---

## Layout

```
┌──────────────────────────────────────────┐
│ FULLSCREEN PHOTO (silhueta + warm glow)  │
│ ┌─ orange warmth overlay ─────────────┐ │
│ │ ┌ dark vignette ┐                   │ │
│ │ │ grain texture │                   │ │
│ │ │                                   │ │
│ │ │  [Content Overlay — bottom-left]  │ │
│ │ │  • Overline                       │ │
│ │ │  • Headline (Orbitron 900)        │ │
│ │ │  • Accent bar                     │ │
│ │ │  • Subtitle                       │ │
│ │ │  • Tags                           │ │
│ │ │  • Footer + Pagination            │ │
│ │ │                                   │ │
│ └───────────────────────────────────┘ │
└──────────────────────────────────────────┘
```

---

## Componentes & Estilos

### Foto (Fullscreen Background)
- `object-fit: cover`, `object-position: center`
- **Warm Toning Overlay:** gradiente laranja esquerda → direita, `rgba(255,85,0,0.25)` → `0.1`
- **Dark Vignette:** radial-gradient ellipse top-right, fade bottom-left/right
- **Grain Overlay:** SVG inline `feTurbulence`, opacity 0.05

### Content Overlay (Bottom-Left Corner)
- Padding: `80px 64px` (top-left), `paddingRight: 55%` (afasta do lado direito)
- Position: `absolute`, `zIndex: 10`

#### Overline
- Barra `3px × 18px` em `--primary-500` + texto JetBrains Mono
- `color: --primary-400`, `letterSpacing: 0.3em`, UPPERCASE

#### Headline
- Orbitron 900, tamanho dinâmico (vertical/square)
- `textShadow: 0 4px 12px rgba(8,8,8,0.8)` — legibilidade sobre foto
- `highlightWords` → `--primary-500`

#### Accent Bar
- `64px × 4px`, gradiente laranja, shadow subtil

#### Subtitle
- Inter 400, `--text-primary` (branco), shadow para legibilidade

#### Tags
- Primeiro tag = primary, resto = secondary
- Background opaco para contraste

#### Bottom Info Bar
- Posição: `absolute`, bottom-left
- Layout: nome | divisor | pagination
- Shadow para legibilidade

### Placeholder (Sem Foto)
- **Background:** gradiente teal → preto, `--secondary-900` + `--bg-primary`
- **Grid decorativo:** `repeating-linear-gradient`, rgba laranja 8% em 60×60px
- **Glow blobs:** radial-gradient bottom-left (laranja) + top-right (cyan)
- **Grain:** overlay sutil
- **Content:** mesmo layout que versão com foto

---

## Cores (Fogo + Elétrico)

| Elemento | Token | Valor |
|----------|-------|-------|
| Overline bar | `--primary-500` | #FF5500 |
| Headline accent | `--primary-500` | #FF5500 |
| Warm overlay | rgba(255,85,0,...) | Laranja 25% |
| Text | `--text-primary` | #F0EDE8 |
| Accent bar gradient | `--gradient-accent` | #FF5500 → #FF7033 |
| Placeholder BG | `--secondary-900` | #0A2020 |

---

## Tipografia

| Elemento | Font | Tamanho | Peso |
|----------|------|--------|------|
| Overline | JetBrains Mono | 12px | 600 |
| Headline | Orbitron | 56px/42px | 900 |
| Subtitle | Inter | 16px | 400 |
| Tags | JetBrains Mono | 13px | - |
| Footer | JetBrains Mono | 13px | 500 |

---

## Foto Utilizada

```
https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&h=800&fit=crop
```
Silhueta perfil aquecido em iluminação laranja/ouro — alinha visualmente com a paleta Fogo + Elétrico.

---

## Verificação Visual

- [ ] Foto preenche tela cheia com bom crop
- [ ] Overlay laranja visível nas bordas direita/topo
- [ ] Vignette escurece canto inferior sem queimar conteúdo
- [ ] Conteúdo legível com shadows
- [ ] Overline com barra laranja destacada
- [ ] Headline grande e impactante (Orbitron 900)
- [ ] Subtitle + tags com bom contraste
- [ ] Footer + pagination bottom-left
- [ ] Placeholder com grid + glow blobs quando sem foto

---

## Decisões Arquiteturais

1. **Foto fullscreen** — cria senso de profundidade e presença; conteúdo sobreposto é mais moderno que split 50/50
2. **Warm toning** — laranja semi-transparente alinha com brand color primário
3. **Content no canto inferior esquerdo** — segue padrão editorial (leitura left-to-right)
4. **Shadows no texto** — garante legibilidade independente da foto de fundo
5. **Placeholder com grid + glow** — mantém identidade cyberpunk mesmo sem foto
