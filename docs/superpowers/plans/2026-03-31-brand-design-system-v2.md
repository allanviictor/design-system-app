# Brand & Design System v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Atualizar `src/index.css` com nova paleta de cores (scales numéricas), trocar Space Grotesk por Orbitron como fonte de headline, e manter aliases semânticos para que os templates existentes não quebrem.

**Architecture:** Todas as mudanças ficam em `src/index.css`. Novos tokens de scale (`--primary-500`, `--secondary-900`, etc.) são definidos no `:root`, aliases semânticos antigos (`--accent-primary`, `--bg-primary`, etc.) passam a apontar para as novas scales via `var()`. `docs/DESIGN-SYSTEM.md` é atualizado para refletir o novo sistema.

**Tech Stack:** CSS Custom Properties, Google Fonts (Orbitron), Tailwind CSS (via aliases existentes)

---

## File Map

| Arquivo | Ação | O que muda |
|---|---|---|
| `src/index.css` | Modify | Google Fonts import (Orbitron), `--font-heading`, escalas primary/secondary/neutral, aliases semânticos, `--font-display`, highlight lines rgba |
| `docs/DESIGN-SYSTEM.md` | Modify | Seções de paleta de cores e tipografia |

---

### Task 1: Atualizar Google Fonts import e font tokens

**Files:**
- Modify: `src/index.css:1` (linha do @import Google Fonts)
- Modify: `src/index.css:11` (`--font-heading` no @theme)
- Modify: `src/index.css:150-152` (`--font-display` no :root)

- [ ] **Step 1: Substituir o import do Google Fonts**

Abra `src/index.css`. A linha 1 atual é:
```css
@import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap");
```

Substituir por:
```css
@import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap");
```

- [ ] **Step 2: Atualizar `--font-heading` no bloco `@theme inline`**

Linha 11 atual:
```css
--font-heading: 'Space Grotesk', system-ui, sans-serif;
```

Substituir por:
```css
--font-heading: 'Orbitron', system-ui, sans-serif;
```

- [ ] **Step 3: Atualizar `--font-display` no `:root`**

Linha 150 atual:
```css
--font-display: 'Space Grotesk', system-ui, sans-serif;
```

Substituir por:
```css
--font-display: 'Orbitron', system-ui, sans-serif;
```

- [ ] **Step 4: Verificar no browser**

```bash
npm run dev
```

Abrir `http://localhost:5173`. Os títulos dos slides devem aparecer em Orbitron (fonte geométrica sci-fi). Se ainda aparecer Space Grotesk, verificar se o cache do browser está sendo usado — fazer hard refresh (Ctrl+Shift+R).

- [ ] **Step 5: Commit**

```bash
git add src/index.css
git commit -m "feat: replace Space Grotesk with Orbitron as headline font"
```

---

### Task 2: Adicionar scales de color tokens ao `:root`

**Files:**
- Modify: `src/index.css` — bloco `:root`, após linha 90 (brand tokens)

- [ ] **Step 1: Adicionar scales primary, secondary e neutral no `:root`**

No bloco `:root` de `src/index.css`, após o comentário `/* ---- Brand tokens (slide canvas — always dark) ---- */` (linha 91), inserir as scales antes dos tokens existentes:

```css
/* ---- Color Scales ---- */

/* Primary — laranja-fogo */
--primary-300: #FF9055;
--primary-400: #FF7033;
--primary-500: #FF5500;
--primary-600: #FF2D00;
--primary-700: #CC2400;
--primary-800: #6B0D00;
--primary-900: #3A0600;

/* Secondary — cyan elétrico */
--secondary-300: #A8F7EE;
--secondary-400: #4DEDD9;
--secondary-500: #00E5C8;
--secondary-600: #00B8A0;
--secondary-700: #008A78;
--secondary-800: #005C50;
--secondary-900: #0A2020;

/* Neutral */
--neutral-950: #080808;
--neutral-900: #111111;
--neutral-800: #1A1A1A;
--neutral-700: #242424;
--neutral-500: #5C5A56;
--neutral-400: #9A9790;
--neutral-100: #F0EDE8;
```

- [ ] **Step 2: Verificar que o CSS não quebrou**

```bash
npm run typecheck
```

Expected: sem erros. (CSS não é checado pelo typecheck, mas confirma que o projeto ainda compila.)

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "feat: add primary, secondary and neutral color scales to CSS tokens"
```

---

### Task 3: Atualizar aliases semânticos para apontar para as novas scales

**Files:**
- Modify: `src/index.css` — seção de brand tokens no `:root` (linhas 93–133)

- [ ] **Step 1: Substituir o bloco de brand tokens antigos**

Localizar e substituir todo o bloco de brand tokens (backgrounds, text, accent, cyan, borders, gradients, shadows) pelos aliases que apontam para as novas scales.

Remover estas seções do `:root`:
```css
/* Backgrounds */
--bg-primary: #141414;
--bg-secondary: #1C1C1C;
--bg-tertiary: #242424;
--bg-code: #111111;

/* Text */
--text-primary: #F0EDE8;
--text-secondary: #9A9790;
--text-muted: #5C5A56;

/* Accent — Laranja (dominante, 70% dos destaques) */
--accent-primary: #FF6B00;
--accent-light: #FF8F3F;
--accent-dark: #CC5500;
--accent-glow: rgba(255, 107, 0, 0.15);

/* Secondary — Cyan Elétrico (suporte, 20% dos destaques) */
--cyan: #00F0E0;
--cyan-muted: #5CE8DC;
--cyan-glow: rgba(0, 240, 224, 0.08);
```

Substituir por aliases que apontam para as scales:
```css
/* ---- Semantic aliases (apontam para as scales acima) ---- */

/* Backgrounds */
--bg-primary:   var(--neutral-950);
--bg-secondary: var(--neutral-800);
--bg-tertiary:  var(--neutral-700);
--bg-code:      var(--neutral-900);

/* Text */
--text-primary:   var(--neutral-100);
--text-secondary: var(--neutral-400);
--text-muted:     var(--neutral-500);

/* Accent — Primary (laranja-fogo, dominante) */
--accent-primary: var(--primary-500);
--accent-light:   var(--primary-400);
--accent-dark:    var(--primary-600);
--accent-glow:    rgba(255, 85, 0, 0.15);

/* Secondary — Cyan elétrico (suporte) */
--cyan:           var(--secondary-500);
--cyan-muted:     var(--secondary-400);
--cyan-glow:      rgba(0, 229, 200, 0.08);

/* Borders (atualizados para nova paleta) */
--border-subtle:    rgba(240, 237, 232, 0.08);
--border-accent:    rgba(255, 85, 0, 0.3);
--border-secondary: rgba(0, 229, 200, 0.12);

/* Gradients */
--gradient-accent: linear-gradient(135deg, #FF5500 0%, #FF7033 100%);
--gradient-bg:     radial-gradient(ellipse at 70% 20%, rgba(255, 85, 0, 0.06) 0%, transparent 60%);
--gradient-cyber:  linear-gradient(180deg, rgba(255, 85, 0, 0.03) 0%, transparent 40%);

/* Shadows */
--shadow-card: 0 1px 3px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(240, 237, 232, 0.05);
--shadow-glow: 0 0 20px rgba(255, 85, 0, 0.1), 0 0 40px rgba(255, 85, 0, 0.05);
--shadow-code: inset 0 1px 2px rgba(0, 0, 0, 0.3);
```

- [ ] **Step 2: Atualizar shadcn `--primary` no `:root` (light) e `.dark`**

No `:root` (linha 64), atualizar:
```css
--primary: #FF5500;
```

No `.dark` (linha 183), atualizar:
```css
--primary: #FF5500;
```

E os tokens `--ring`, `--chart-1`, `--sidebar-primary`, `--sidebar-ring` em ambos os blocos:
```css
--ring: #FF5500;
--chart-1: #FF5500;
--chart-2: #00E5C8;
--sidebar-primary: #FF5500;
--sidebar-ring: #FF5500;
```

- [ ] **Step 3: Atualizar syntax highlighting para nova paleta**

Localizar o bloco `/* Syntax Highlighting */` e atualizar:
```css
/* Syntax Highlighting */
--code-keyword:  var(--primary-500);   /* const, await, interface, => */
--code-function: var(--secondary-500); /* fetch, then, json, map */
--code-string:   #8BBF65;
--code-number:   #D4A054;
--code-comment:  var(--neutral-500);
--code-variable: var(--neutral-100);
--code-type:     #C396D8;              /* User, Promise */
--code-operator: var(--neutral-400);   /* =, +, : */
```

- [ ] **Step 4: Atualizar highlighted lines no Shiki reset**

Localizar (linha 240):
```css
.shiki .line[data-highlighted="true"] {
    background: rgba(255, 107, 0, 0.08);
    border-left: 2px solid var(--accent-primary);
```

Substituir por:
```css
.shiki .line[data-highlighted="true"] {
    background: rgba(255, 85, 0, 0.08);
    border-left: 2px solid var(--accent-primary);
```

- [ ] **Step 5: Verificar no browser**

```bash
npm run dev
```

Abrir `http://localhost:5173`. Verificar:
- Cor de destaque dos slides é laranja-fogo (`#FF5500`) — mais quente que antes
- Código ainda aparece com syntax highlighting correto
- Nenhum slide quebra visualmente

- [ ] **Step 6: Rodar build para confirmar sem erros**

```bash
npm run build
```

Expected:
```
✓ built in Xs
```

Se houver erros de CSS, verificar se alguma variável foi referenciada antes de ser definida no `:root`.

- [ ] **Step 7: Commit**

```bash
git add src/index.css
git commit -m "feat: update semantic aliases to point to new color scales"
```

---

### Task 4: Atualizar `docs/DESIGN-SYSTEM.md`

**Files:**
- Modify: `docs/DESIGN-SYSTEM.md` — seções 1 (Paleta) e 2 (Tipografia)

- [ ] **Step 1: Atualizar seção de tipografia**

Localizar a tabela de Font Stack (seção 2) e substituir:

```markdown
| Uso | Font | Fallback | Por quê |
|-----|------|----------|---------|
| Headlines | **Orbitron** | system-ui, sans-serif | Geométrica sci-fi, personalidade cyberpunk forte. Distintiva sem perder legibilidade em tamanhos grandes |
| Body | **Inter** | system-ui, sans-serif | Legibilidade máxima em telas, neutro profissional |
| Metadados, overlines, paginação, footer, tags | **JetBrains Mono** | monospace | Expande papel além do código — cria consistência técnica nos elementos de UI |
| Código | **JetBrains Mono** | monospace | Desenhada para código, ligaturas bonitas, distingue bem 0/O e 1/l |
```

- [ ] **Step 2: Atualizar seção de paleta de cores**

Substituir a seção `## 1. Paleta de Cores` inteira pelo novo sistema de scales:

```markdown
## 1. Paleta de Cores

### Scales

#### Primary — laranja-fogo

| Token | Hex | Uso |
|-------|-----|-----|
| `--primary-300` | `#FF9055` | highlights, decorativo |
| `--primary-400` | `#FF7033` | hover states, versão suave |
| `--primary-500` | `#FF5500` | **base** — headlines, CTAs, keywords |
| `--primary-600` | `#FF2D00` | vermelho-fogo — bordas ativas, pressed |
| `--primary-700` | `#CC2400` | sombras, estados desabilitados |
| `--primary-800` | `#6B0D00` | ferrugem — fundos de destaque, glows |
| `--primary-900` | `#3A0600` | fundos sutis, bg de cards com acento |

#### Secondary — cyan elétrico

| Token | Hex | Uso |
|-------|-----|-----|
| `--secondary-300` | `#A8F7EE` | highlights sutis |
| `--secondary-400` | `#4DEDD9` | texto secundário, versão suave |
| `--secondary-500` | `#00E5C8` | **base** — funções, tipos, tags, brackets |
| `--secondary-600` | `#00B8A0` | hover states |
| `--secondary-700` | `#008A78` | bordas sutis com acento cyan |
| `--secondary-800` | `#005C50` | sombras |
| `--secondary-900` | `#0A2020` | teal profundo — fundos secundários, bg cards |

#### Neutral

| Token | Hex | Uso |
|-------|-----|-----|
| `--neutral-950` | `#080808` | bg-primary — fundo dos slides |
| `--neutral-900` | `#111111` | bg-code — blocos de código |
| `--neutral-800` | `#1A1A1A` | bg-secondary — cards |
| `--neutral-700` | `#242424` | bg-tertiary — hover, elementos elevados |
| `--neutral-500` | `#5C5A56` | text-muted — paginação, metadados |
| `--neutral-400` | `#9A9790` | text-secondary — subtítulos |
| `--neutral-100` | `#F0EDE8` | text-primary — headlines, body |

### Aliases semânticos

Os aliases mantêm compatibilidade com templates existentes e apontam para as scales:

```css
--accent-primary: var(--primary-500)   /* #FF5500 */
--accent-light:   var(--primary-400)   /* #FF7033 */
--accent-dark:    var(--primary-600)   /* #FF2D00 */
--bg-primary:     var(--neutral-950)   /* #080808 */
--bg-secondary:   var(--neutral-800)   /* #1A1A1A */
--bg-code:        var(--neutral-900)   /* #111111 */
--text-primary:   var(--neutral-100)   /* #F0EDE8 */
--text-secondary: var(--neutral-400)   /* #9A9790 */
--text-muted:     var(--neutral-500)   /* #5C5A56 */
--cyan:           var(--secondary-500) /* #00E5C8 */
```

### Hierarquia de cor

```
Primary (#FF5500) — 70% dos destaques visuais
├── Headlines (palavras-chave)
├── Accent bars e CTAs
├── Keywords no código (const, await, interface)
└── Tags primárias, bordas ativas

Secondary (#00E5C8) — 20% dos destaques visuais
├── Nomes de função no código
├── Tags secundárias e brackets
└── Detalhes decorativos

Neutral — 10% restantes
├── Texto corrido
└── Metadados (paginação, footer)
```
```

- [ ] **Step 3: Commit**

```bash
git add docs/DESIGN-SYSTEM.md
git commit -m "docs: update DESIGN-SYSTEM with v2 color scales and Orbitron typography"
```

---

## Self-Review Checklist

- [x] **Spec coverage:** Orbitron → Task 1. Scales primary/secondary/neutral → Task 2. Aliases semânticos → Task 3. `docs/DESIGN-SYSTEM.md` → Task 4. `npm run build` → Task 3 Step 6.
- [x] **Sem placeholders:** todos os steps têm código concreto.
- [x] **Consistência de tipos:** `--primary-500`, `--secondary-500`, `--neutral-950` usados consistentemente em Tasks 2, 3 e 4.
- [x] **shadcn tokens:** `--primary`, `--ring`, `--chart-1`, `--chart-2` atualizados na Task 3 Step 2 para refletir nova paleta.
- [x] **Sem regressão:** aliases semânticos mantidos — templates existentes não quebram.
