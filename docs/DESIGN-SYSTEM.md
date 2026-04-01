# AVM Slides — Design System

**Versão:** 2.0
**Última atualização:** 31/03/2026

---

## Filosofia

- **Técnico, mas acessível** — legível tanto para juniores quanto seniores
- **Orgânico com detalhes cyber** — gradientes suaves como base, texturas digitais como tempero
- **Consistente** — todo post é reconhecível como "do Allan" no feed
- **Code-first** — otimizado para exibir código com clareza
- **Laranja domina** — hierarquia por frequência: laranja nos elementos de maior peso visual, cyan nos detalhes

---

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

### Gradientes

```css
/* Gradiente principal — barras de destaque, underlines */
--gradient-accent: linear-gradient(135deg, #FF5500 0%, #FF7033 100%);

/* Gradiente de fundo — shapes decorativos (laranja dominante) */
--gradient-bg: radial-gradient(ellipse at 70% 20%, rgba(255, 85, 0, 0.06) 0%, transparent 60%);

/* Gradiente cyber sutil — efeito atmosférico */
--gradient-cyber: linear-gradient(180deg, rgba(255, 85, 0, 0.03) 0%, transparent 40%);
```

### Hierarquia de Cor (Regra de Uso)

```
Primary (#FF5500) — 70% dos destaques visuais
├── Headlines (palavras-chave)
├── Accent bars e CTAs
├── Keywords no código (const, await, interface)
└── Tags primárias, bordas ativas

Secondary (#00E5C8) — 20% dos destaques visuais
├── Nomes de função no código
├── Tipos no código
├── Tags secundárias e brackets
└── Detalhes decorativos

Neutral — 10% restantes
├── Texto corrido
└── Metadados (paginação, footer)
```

---

## 2. Tipografia

### Font Stack

| Uso | Font | Fallback | Por quê |
|-----|------|----------|---------|
| Headlines | **Orbitron** | system-ui, sans-serif | Geométrica sci-fi, personalidade cyberpunk forte. Distintiva sem perder legibilidade em tamanhos grandes |
| Body | **Inter** | system-ui, sans-serif | Legibilidade máxima em telas, neutro profissional |
| Metadados, overlines, paginação, footer, tags | **JetBrains Mono** | monospace | Expande papel além do código — cria consistência técnica nos elementos de UI |
| Código | **JetBrains Mono** | monospace | Desenhada para código, ligaturas bonitas, distingue bem 0/O e 1/l |

### Escala Tipográfica

Base: 16px. Escala: 1.333 (Perfect Fourth)

| Token | Tamanho | Line Height | Peso | Uso |
|-------|---------|-------------|------|-----|
| `--text-display` | 56px / 3.5rem | 1.1 | 700 | Headline principal do slide de capa |
| `--text-h1` | 42px / 2.625rem | 1.15 | 700 | Headlines de slides internos |
| `--text-h2` | 32px / 2rem | 1.2 | 600 | Subtítulos, títulos de seção |
| `--text-h3` | 24px / 1.5rem | 1.3 | 600 | Títulos de cards, labels grandes |
| `--text-body` | 18px / 1.125rem | 1.6 | 400 | Texto corrido principal |
| `--text-body-sm` | 16px / 1rem | 1.5 | 400 | Texto secundário, descrições |
| `--text-caption` | 13px / 0.8125rem | 1.4 | 500 | Tags, paginação, metadados |
| `--text-overline` | 12px / 0.75rem | 1.3 | 600 | Categorias acima do título (UPPERCASE, letter-spacing: 0.15em) |
| `--text-code` | 15px / 0.9375rem | 1.6 | 400 | Blocos de código |

### Regras de Tipografia

- Headlines sempre em **Orbitron Bold (700)**
- Palavras-chave nas headlines em `--accent-primary` (laranja-fogo)
- Body sempre em **Inter Regular (400)**
- Código sempre em **JetBrains Mono**
- Metadados e overlines (categoria, paginação) em **JetBrains Mono** (uppercase, letter-spacing 0.15em)
- Nunca usar mais de 2 pesos da mesma font por slide
- Máximo ~60-70 caracteres por linha em body text

---

## 3. Espaçamento

Base: 4px grid

| Token | Valor | Uso |
|-------|-------|-----|
| `--space-1` | 4px | Micro ajustes |
| `--space-2` | 8px | Gap entre ícones e labels |
| `--space-3` | 12px | Padding interno de tags/badges |
| `--space-4` | 16px | Gap entre elementos inline |
| `--space-5` | 20px | — |
| `--space-6` | 24px | Gap entre parágrafos |
| `--space-8` | 32px | Separação entre seções menores |
| `--space-10` | 40px | Padding de cards |
| `--space-12` | 48px | Separação entre seções |
| `--space-16` | 64px | Padding lateral dos slides |
| `--space-20` | 80px | Margem top/bottom principal |

### Padding dos Slides

| Formato | Padding Horizontal | Padding Top | Padding Bottom |
|---------|-------------------|-------------|----------------|
| Vertical (1080×1350) | 64px | 80px | 64px |
| Quadrado (1080×1080) | 64px | 64px | 56px |

---

## 4. Border Radius

| Token | Valor | Uso |
|-------|-------|-----|
| `--radius-sm` | 4px | Tags, badges, inline code |
| `--radius-md` | 8px | Botões, inputs |
| `--radius-lg` | 12px | Cards de conteúdo |
| `--radius-xl` | 16px | Cards principais, blocos de código |
| `--radius-full` | 9999px | Avatares, indicadores |

---

## 5. Sombras e Elevação

```css
/* Sombra sutil para cards sobre o bg */
--shadow-card: 0 1px 3px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(240, 237, 232, 0.05);

/* Glow sutil laranja para elementos de destaque */
--shadow-glow: 0 0 20px rgba(255, 107, 0, 0.1), 0 0 40px rgba(255, 107, 0, 0.05);

/* Sombra para blocos de código */
--shadow-code: inset 0 1px 2px rgba(0, 0, 0, 0.3);
```

---

## 6. Elementos Decorativos

### Barra de Destaque (Accent Bar)
- Gradiente horizontal (`--gradient-accent`)
- Largura: 48px, Altura: 4px
- Posição: abaixo do título principal, com `--space-6` de distância
- Border-radius: 2px

### Shapes de Fundo (Orgânicos)
- Elipses com gradiente radial sutil (`--accent-glow`)
- Posição: canto superior direito ou inferior esquerdo
- Opacity: 0.4–0.6
- Blur: 80–120px
- Cor predominante: laranja. Cyan pode aparecer como shape secundário menor com opacity ainda mais baixa (0.08 max)
- Nunca devem competir com o conteúdo

### Textura Glitch (Pontual)
- Grid de linhas finas (`--border-subtle`) em padrão de scanlines
- Aplicar apenas em backgrounds de slides de capa ou separadores
- Opacity máxima: 0.05
- Nunca em slides de conteúdo (atrapalha leitura)

### Dividers
- Linha fina: 1px solid `--border-subtle`
- Ou: gradiente que fade nas pontas (opacity 0 → 0.08 → 0)

---

## 7. Blocos de Código

### Styling
```css
.code-block {
  background: var(--bg-code);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-xl);
  padding: var(--space-8) var(--space-8);
  font-family: 'JetBrains Mono', monospace;
  font-size: var(--text-code);
  line-height: 1.6;
  overflow: hidden;
}
```

### Syntax Highlighting (tema custom — Shiki)
| Elemento | Cor | Token |
|----------|-----|-------|
| Keyword (`const`, `await`, `interface`, `=>`) | `#FF5500` | Primary (laranja-fogo) |
| Function (`fetch`, `then`, `json`, `map`) | `#00E5C8` | Secondary (cyan elétrico) |
| String | `#8BBF65` | Verde suave |
| Number | `#D4A054` | Dourado |
| Comment | `#5C5A56` | Muted |
| Variable | `#F0EDE8` | Texto primário |
| Type/Class (`User`, `Promise`) | `#C396D8` | Lilás |
| Operator (`=`, `+`, `:`) | `#9A9790` | Texto secundário |

### Indicadores de Código
- Linguagem: badge no canto superior direito do bloco
- Números de linha: cor `--text-muted`, separados por borda sutil
- Linhas destacadas: background `rgba(255, 85, 0, 0.08)`, borda esquerda `var(--accent-primary)`
- Comentários de erro: cor `--color-error`
- Comentários de aviso: cor `--color-warning`

---

## 8. Tags e Badges

### Tag Primária (laranja-fogo)
```css
.tag-primary {
  background: rgba(255, 85, 0, 0.12);
  border: 1px solid rgba(255, 85, 0, 0.25);
  color: var(--accent-light); /* #FF7033 */
  font-family: 'JetBrains Mono', monospace;
  font-size: var(--text-caption);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-sm);
  text-transform: lowercase;
}
```

### Tag Secundária (cyan elétrico)
```css
.tag-secondary {
  background: rgba(0, 229, 200, 0.06);
  border: 1px solid rgba(0, 229, 200, 0.12);
  color: var(--secondary-400); /* #4DEDD9 */
  font-family: 'JetBrains Mono', monospace;
  font-size: var(--text-caption);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-sm);
  text-transform: lowercase;
}
```

### Regra de Uso
- Tag do assunto principal do post → laranja (ex: "react", "typescript")
- Tags secundárias/categorias → cyan (ex: "hooks", "performance", "tutorial")

---

## 9. Assinatura / Marca Pessoal

### Formato
**Allan Victor** — texto simples em Orbitron, peso 600.

### Posição nos Slides
- **Slide final:** centralizado, tamanho `--text-h3`, com acento laranja no "Victor" ou um underline gradiente
- **Demais slides:** footer discreto em JetBrains Mono, tamanho `--text-caption`, cor `--text-muted`, alinhado à direita
- Formato no footer: `allan victor · @handle`

### Variação Curta
Para espaços reduzidos: **AVM** em Orbitron Bold

---

## 10. Paginação

```css
.pagination {
  font-family: 'JetBrains Mono', monospace;
  font-size: var(--text-caption);
  color: var(--text-muted);
  position: absolute;
  bottom: var(--space-8);
  right: var(--space-16);
}
/* Formato: 01 / 08 */
```

---

## 11. Responsividade de Formato

### Vertical (1080 × 1350px)
- Mais espaço vertical — ideal para conteúdo longo e blocos de código
- Headlines podem ser maiores (`--text-display`)
- Blocos de código com mais linhas visíveis

### Quadrado (1080 × 1080px)
- Mais compacto — ideal para conceitos, comparações
- Headlines reduzidas (`--text-h1`)
- Body text pode reduzir para `--text-body-sm`
- Blocos de código com menos linhas (máx. ~12 linhas)

---

## 12. Acessibilidade

Contrastes validados sobre `--bg-primary` (#080808):

| Cor | Contraste | Status |
|-----|-----------|--------|
| `--text-primary` (#F0EDE8) | **16.5:1** | ✅ AAA |
| `--accent-primary` (#FF5500) | **7.2:1** | ✅ AA |
| `--secondary-500` (#00E5C8) | **10.8:1** | ✅ AAA |
| `--text-secondary` (#9A9790) | **6.1:1** | ✅ AA |
| `--text-muted` (#5C5A56) | **3.2:1** | ⚠️ Decorativo apenas |
| `--accent-light` (#FF7033) | **8.1:1** | ✅ AAA |

---

## 13. Implementação como CSS Custom Properties

```css
:root {
  /* Color Scales */
  
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

  /* Semantic aliases */
  --bg-primary: var(--neutral-950);
  --bg-secondary: var(--neutral-800);
  --bg-tertiary: var(--neutral-700);
  --bg-code: var(--neutral-900);

  --text-primary: var(--neutral-100);
  --text-secondary: var(--neutral-400);
  --text-muted: var(--neutral-500);

  --accent-primary: var(--primary-500);
  --accent-light: var(--primary-400);
  --accent-dark: var(--primary-600);
  --accent-glow: rgba(255, 85, 0, 0.15);

  --cyan: var(--secondary-500);
  --secondary-glow: rgba(0, 229, 200, 0.08);

  /* Semantic */
  --color-success: #2D8B6B;
  --color-error: #8B2E2E;
  --color-warning: #8B6B2E;
  --color-info: #2E4F8B;

  /* Borders */
  --border-subtle: rgba(240, 237, 232, 0.08);
  --border-accent: rgba(255, 85, 0, 0.3);
  --border-secondary: rgba(0, 229, 200, 0.12);

  /* Gradients */
  --gradient-accent: linear-gradient(135deg, #FF5500 0%, #FF7033 100%);
  --gradient-bg: radial-gradient(ellipse at 70% 20%, rgba(255, 85, 0, 0.06) 0%, transparent 60%);
  --gradient-cyber: linear-gradient(180deg, rgba(255, 85, 0, 0.03) 0%, transparent 40%);

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;

  /* Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;

  /* Typography */
  --font-display: 'Orbitron', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --font-code: 'JetBrains Mono', monospace;

  /* Syntax Highlighting */
  --code-keyword: var(--primary-500);
  --code-function: var(--secondary-500);
  --code-string: #8BBF65;
  --code-number: #D4A054;
  --code-comment: var(--neutral-500);
  --code-variable: var(--neutral-100);
  --code-type: #C396D8;
  --code-operator: var(--neutral-400);
}
```
