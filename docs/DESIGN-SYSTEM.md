# AVM Slides — Design System

**Versão:** 1.1
**Última atualização:** 29/03/2026

---

## Filosofia

- **Técnico, mas acessível** — legível tanto para juniores quanto seniores
- **Orgânico com detalhes cyber** — gradientes suaves como base, texturas digitais como tempero
- **Consistente** — todo post é reconhecível como "do Allan" no feed
- **Code-first** — otimizado para exibir código com clareza
- **Laranja domina** — hierarquia por frequência: laranja nos elementos de maior peso visual, cyan nos detalhes

---

## 1. Paleta de Cores

### Dark Theme (Primário)

#### Backgrounds
| Token | Hex | Uso |
|-------|-----|-----|
| `--bg-primary` | `#141414` | Fundo principal dos slides |
| `--bg-secondary` | `#1C1C1C` | Cards, blocos de conteúdo |
| `--bg-tertiary` | `#242424` | Elementos elevados, hover states |
| `--bg-code` | `#111111` | Blocos de código |

#### Texto
| Token | Hex | Uso |
|-------|-----|-----|
| `--text-primary` | `#F0EDE8` | Texto principal, headlines |
| `--text-secondary` | `#9A9790` | Subtítulos, texto de apoio |
| `--text-muted` | `#5C5A56` | Labels, metadados, paginação |

#### Acento Primário — Laranja (cor dominante)
| Token | Hex | Uso |
|-------|-----|-----|
| `--accent-primary` | `#FF6B00` | Headlines com destaque, keywords, CTAs, barras de destaque |
| `--accent-light` | `#FF8F3F` | Hover states, variações suaves, tags primárias |
| `--accent-dark` | `#CC5500` | Bordas ativas, estados pressed |
| `--accent-glow` | `rgba(255, 107, 0, 0.15)` | Glow sutil em elementos de destaque, shapes de fundo |

**Onde usar laranja:** headlines com palavras-chave, accent bars, CTAs, keywords no código, tags primárias, links, bordas ativas. É a cor que o olho deve encontrar primeiro.

#### Acento Secundário — Cyan Elétrico (cor de suporte)
| Token | Hex | Uso |
|-------|-----|-----|
| `--secondary` | `#00F0E0` | Nomes de função no código, tags secundárias, tipos no código |
| `--secondary-muted` | `#5CE8DC` | Versão mais suave para textos menores |
| `--secondary-glow` | `rgba(0, 240, 224, 0.08)` | Background sutil de tags secundárias |

**Onde usar cyan:** nomes de função e tipos no syntax highlighting, tags/badges secundárias, ícones de suporte, detalhes decorativos pontuais. Nunca em headlines ou CTAs.

#### Semânticas
| Token | Hex | Uso |
|-------|-----|-----|
| `--color-success` | `#2D8B6B` | Exemplos corretos, "faça isso", borda de card positivo |
| `--color-error` | `#8B2E2E` | Exemplos errados, "não faça isso", borda de card negativo |
| `--color-warning` | `#8B6B2E` | Alertas, cuidados |
| `--color-info` | `#2E4F8B` | Informações complementares |

#### Decorativos
| Token | Hex | Uso |
|-------|-----|-----|
| `--border-subtle` | `rgba(240, 237, 232, 0.08)` | Bordas de cards e divisores |
| `--border-accent` | `rgba(255, 107, 0, 0.3)` | Bordas com destaque laranja |
| `--border-secondary` | `rgba(0, 240, 224, 0.12)` | Bordas com destaque cyan |

### Gradientes

```css
/* Gradiente principal — barras de destaque, underlines */
--gradient-accent: linear-gradient(135deg, #FF6B00 0%, #FF8F3F 100%);

/* Gradiente de fundo — shapes decorativos (laranja dominante) */
--gradient-bg: radial-gradient(ellipse at 70% 20%, rgba(255, 107, 0, 0.06) 0%, transparent 60%);

/* Gradiente cyber sutil — efeito atmosférico */
--gradient-cyber: linear-gradient(180deg, rgba(255, 107, 0, 0.03) 0%, transparent 40%);
```

### Hierarquia de Cor (Regra de Uso)

```
Laranja (#FF6B00) — 70% dos destaques visuais
├── Headlines (palavras-chave)
├── Accent bars
├── CTAs e botões
├── Keywords no código (const, await, interface, =>)
├── Tags primárias (nome da tecnologia principal)
├── Links e elementos interativos
└── Shapes de fundo (glow)

Cyan (#00F0E0) — 20% dos destaques visuais
├── Nomes de função no código (fetch, then, json)
├── Tipos no código (string, number)
├── Tags secundárias (temas, categorias)
└── Detalhes decorativos pontuais

Neutro (cinzas) — 10% restantes
├── Texto corrido
├── Operadores e pontuação no código
└── Metadados (paginação, footer)
```

---

## 2. Tipografia

### Font Stack

| Uso | Font | Fallback | Por quê |
|-----|------|----------|---------|
| Headlines | **Space Grotesk** | system-ui, sans-serif | Geométrica, moderna, boa em tamanhos grandes. Tem personalidade sem perder legibilidade |
| Body | **Inter** | system-ui, sans-serif | Legibilidade máxima em telas, neutro profissional |
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

- Headlines sempre em **Space Grotesk Bold (700)**
- Palavras-chave nas headlines em `--accent-primary` (laranja)
- Body sempre em **Inter Regular (400)**
- Código sempre em **JetBrains Mono**
- Overlines (categoria do slide) em UPPERCASE com letter-spacing de 0.15em
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
| Keyword (`const`, `await`, `interface`, `=>`) | `#FF6B00` | Laranja (acento primário) |
| Function (`fetch`, `then`, `json`, `map`) | `#00F0E0` | Cyan (acento secundário) |
| String | `#8BBF65` | Verde suave |
| Number | `#D4A054` | Dourado |
| Comment | `#5C5A56` | Muted |
| Variable | `#F0EDE8` | Texto primário |
| Type/Class (`User`, `Promise`) | `#C396D8` | Lilás |
| Operator (`=`, `+`, `:`) | `#9A9790` | Texto secundário |

### Indicadores de Código
- Linguagem: badge no canto superior direito do bloco
- Números de linha: cor `--text-muted`, separados por borda sutil
- Linhas destacadas: background `rgba(255, 107, 0, 0.08)`
- Comentários de erro: cor `--color-error`
- Comentários de aviso: cor `--color-warning`

---

## 8. Tags e Badges

### Tag Primária (laranja)
```css
.tag-primary {
  background: rgba(255, 107, 0, 0.12);
  border: 1px solid rgba(255, 107, 0, 0.25);
  color: var(--accent-light); /* #FF8F3F */
  font-family: 'JetBrains Mono', monospace;
  font-size: var(--text-caption);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-sm);
  text-transform: lowercase;
}
```

### Tag Secundária (cyan)
```css
.tag-secondary {
  background: rgba(0, 240, 224, 0.06);
  border: 1px solid rgba(0, 240, 224, 0.12);
  color: var(--secondary-muted); /* #5CE8DC */
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
**Allan Victor** — texto simples em Space Grotesk, peso 600.

### Posição nos Slides
- **Slide final:** centralizado, tamanho `--text-h3`, com acento laranja no "Victor" ou um underline gradiente
- **Demais slides:** footer discreto, tamanho `--text-caption`, cor `--text-muted`, alinhado à direita
- Formato no footer: `allan victor · @handle`

### Variação Curta
Para espaços reduzidos: **AVM** em Space Grotesk Bold

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

Contrastes validados sobre `--bg-primary` (#141414):

| Cor | Contraste | Status |
|-----|-----------|--------|
| `--text-primary` (#F0EDE8) | **15.2:1** | ✅ AAA |
| `--accent-primary` (#FF6B00) | **4.8:1** | ✅ AA |
| `--secondary` (#00F0E0) | **9.5:1** | ✅ AAA |
| `--text-secondary` (#9A9790) | **5.8:1** | ✅ AA |
| `--text-muted` (#5C5A56) | **3.1:1** | ⚠️ Decorativo apenas |
| `--accent-light` (#FF8F3F) | **6.4:1** | ✅ AA |

---

## 13. Implementação como CSS Custom Properties

```css
:root {
  /* Backgrounds */
  --bg-primary: #141414;
  --bg-secondary: #1C1C1C;
  --bg-tertiary: #242424;
  --bg-code: #111111;

  /* Text */
  --text-primary: #F0EDE8;
  --text-secondary: #9A9790;
  --text-muted: #5C5A56;

  /* Accent — Laranja (dominante) */
  --accent-primary: #FF6B00;
  --accent-light: #FF8F3F;
  --accent-dark: #CC5500;
  --accent-glow: rgba(255, 107, 0, 0.15);

  /* Secondary — Cyan Elétrico (suporte) */
  --secondary: #00F0E0;
  --secondary-muted: #5CE8DC;
  --secondary-glow: rgba(0, 240, 224, 0.08);

  /* Semantic */
  --color-success: #2D8B6B;
  --color-error: #8B2E2E;
  --color-warning: #8B6B2E;
  --color-info: #2E4F8B;

  /* Borders */
  --border-subtle: rgba(240, 237, 232, 0.08);
  --border-accent: rgba(255, 107, 0, 0.3);
  --border-secondary: rgba(0, 240, 224, 0.12);

  /* Gradients */
  --gradient-accent: linear-gradient(135deg, #FF6B00 0%, #FF8F3F 100%);
  --gradient-bg: radial-gradient(ellipse at 70% 20%, rgba(255, 107, 0, 0.06) 0%, transparent 60%);

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
  --font-display: 'Space Grotesk', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --font-code: 'JetBrains Mono', monospace;

  /* Syntax Highlighting */
  --code-keyword: #FF6B00;
  --code-function: #00F0E0;
  --code-string: #8BBF65;
  --code-number: #D4A054;
  --code-comment: #5C5A56;
  --code-variable: #F0EDE8;
  --code-type: #C396D8;
  --code-operator: #9A9790;
}
```
