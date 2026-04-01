# Brand & Design System — Spec

**Data:** 2026-03-31
**Status:** Aprovado

---

## Contexto

O design system atual (v1) usa Space Grotesk + laranja/cyan genéricos e foi avaliado como sem personalidade suficiente. O objetivo é evoluir para uma identidade visual **Cyberpunk Tech Editorial** — grit controlado, tipografia com caráter sci-fi, paleta quente com tensão fria.

Os elementos visuais cyberpunk (grain, grid, brackets, glows nos slides) são fora de escopo nesta fase — serão tratados numa iteração futura de refatoração dos templates.

---

## Direção Visual

**Estilo:** Tech Editorial com grit cyberpunk equilibrado
**Peso visual:** Identidade presente via tipografia e cor — corpo dos slides limpo e legível
**Referência:** Paleta de tensão quente/fria (laranja-fogo vs cyan elétrico), tipografia geométrica sci-fi

---

## Tipografia

| Papel | Fonte | Peso | Mudança |
|---|---|---|---|
| Headlines | **Orbitron** | 700/900 | Substitui Space Grotesk |
| Body | **Inter** | 400 | Mantido |
| Metadados, overlines, paginação, footer, tags | **JetBrains Mono** | 500 | Expande papel (antes só código) |
| Código | **JetBrains Mono** | 400 | Mantido |

- Space Grotesk é removido completamente
- Orbitron carregado via Google Fonts: `family=Orbitron:wght@700;900`
- `--font-display` atualizado de `'Space Grotesk'` para `'Orbitron'`

---

## Paleta de Cores

### Primary — laranja-fogo

| Token | Hex | Papel |
|---|---|---|
| `--primary-300` | `#FF9055` | highlights, decorativo |
| `--primary-400` | `#FF7033` | hover states |
| `--primary-500` | `#FF5500` | ★ base — headlines, CTAs, keywords |
| `--primary-600` | `#FF2D00` | ★ vermelho-fogo — bordas ativas, pressed |
| `--primary-700` | `#CC2400` | sombras, estados desabilitados |
| `--primary-800` | `#6B0D00` | ★ ferrugem — fundos de destaque, glows |
| `--primary-900` | `#3A0600` | fundos sutis, bg de cards com acento |

### Secondary — cyan elétrico

| Token | Hex | Papel |
|---|---|---|
| `--secondary-300` | `#A8F7EE` | highlights sutis |
| `--secondary-400` | `#4DEDD9` | texto secundário, versão suave |
| `--secondary-500` | `#00E5C8` | ★ base — funções, tipos, tags, brackets |
| `--secondary-600` | `#00B8A0` | hover states |
| `--secondary-700` | `#008A78` | bordas sutis |
| `--secondary-800` | `#005C50` | sombras |
| `--secondary-900` | `#0A2020` | ★ teal profundo — fundos secundários, bg cards |

### Neutros

| Token | Hex | Papel |
|---|---|---|
| `--neutral-950` | `#080808` | bg-primary — fundo dos slides |
| `--neutral-900` | `#111111` | bg-code — blocos de código |
| `--neutral-800` | `#1A1A1A` | bg-secondary — cards |
| `--neutral-700` | `#242424` | bg-tertiary — hover, elevados |
| `--neutral-500` | `#5C5A56` | text-muted — paginação, metadados |
| `--neutral-400` | `#9A9790` | text-secondary — subtítulos |
| `--neutral-100` | `#F0EDE8` | text-primary — headlines, body |

### Aliases semânticos (mantidos por compatibilidade)

Os aliases existentes apontam para as novas scales:

```css
--accent-primary:   var(--primary-500);
--accent-light:     var(--primary-400);
--accent-dark:      var(--primary-600);
--accent-glow:      rgba(255, 85, 0, 0.15);

--secondary:        var(--secondary-500);
--secondary-muted:  var(--secondary-400);
--secondary-glow:   rgba(0, 229, 200, 0.08);

--bg-primary:       var(--neutral-950);
--bg-secondary:     var(--neutral-800);
--bg-tertiary:      var(--neutral-700);
--bg-code:          var(--neutral-900);

--text-primary:     var(--neutral-100);
--text-secondary:   var(--neutral-400);
--text-muted:       var(--neutral-500);
```

Aliases semânticos de cor permitem que os templates existentes continuem funcionando sem alteração.

---

## Arquivos que mudam

| Arquivo | O que muda |
|---|---|
| `src/index.css` | Import do Orbitron, remoção do Space Grotesk, nova paleta de scales, atualização de aliases, `--font-display` |
| `docs/DESIGN-SYSTEM.md` | Seções de paleta e tipografia atualizadas |

**Fora de escopo:**
- Templates de slides (`CoverSlide`, `ContentSlide`, etc.)
- Componentes compartilhados (`AccentBar`, `SlideCanvas`, etc.)
- Posts em `src/posts/`
- `tailwind.config` / `components.json` (não requerem mudança — consomem os aliases CSS que serão atualizados)

---

## Critérios de sucesso

- Slides renderizam com Orbitron nos headlines
- Cor de destaque visível é `#FF5500` (não mais `#FF6B00`)
- Todos os aliases semânticos funcionam — nenhum template quebra
- `npm run build` passa sem erros
