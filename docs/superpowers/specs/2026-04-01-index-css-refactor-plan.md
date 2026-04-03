# Plano: Refatoração do src/index.css (v1 Brand)

**Data:** 2026-04-01
**Status:** Planning
**Objetivo:** Atualizar CSS tokens com nova identidade visual (DM Sans + orange #FF6B00 + off-white #FAF8F3)

---

## Overview

Atual `index.css` (v2 cyberpunk) precisa ser completamente refatorado para refletir a nova identidade visual v1 (minimalista + moderno editorial). Foco: **tema light apenas**, tokens limpos e simples.

---

## O que MUDA

### 1. Google Fonts Import
**Atual:**
```css
@import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap");
```

**Novo:**
```css
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap");
```

**Mudanças:**
- ❌ Remove Orbitron (sci-fi, não mais usado)
- ✅ Adiciona DM Sans 700 (headlines)
- ✅ Inter: mantém 400/500/600, adiciona 700 (bold para tags/botões)
- ✅ JetBrains Mono: mantém 400/500 (código futura)

---

### 2. Tailwind Theme — Font Families

**Atual:**
```css
@theme inline {
    --font-sans: 'Inter', system-ui, sans-serif;
    --font-heading: 'Orbitron', system-ui, sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
}
```

**Novo:**
```css
@theme inline {
    --font-sans: 'Inter', system-ui, sans-serif;
    --font-heading: 'DM Sans', system-ui, sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
}
```

**Mudança:** Orbitron → DM Sans

---

### 3. Tailwind Theme — Radius (manter igual)

Sem mudanças necessárias. Já estão corretos:
```css
--radius-sm:   4px;
--radius-md:   8px;
--radius-lg:   12px;
--radius-xl:   16px;
--radius-2xl:  24px;
--radius-full: 9999px;
```

---

### 4. :root — shadcn Tokens (Light Mode)

**Atual:** Misturado com tokens dark
**Novo:** Limpo, apenas light mode

Tokens shadcn mapeados para a nova paleta:
```css
:root {
    /* ---- shadcn Light Mode ---- */
    --background: #FAF8F3;           /* bg-primary off-white */
    --foreground: #141414;           /* text-primary dark */
    
    --card: #F5F3EE;                 /* bg-secondary */
    --card-foreground: #141414;      /* text-primary */
    
    --popover: #FEFDFB;              /* bg-light */
    --popover-foreground: #141414;   /* text-primary */
    
    --primary: #FF6B00;              /* orange base */
    --primary-foreground: #ffffff;   /* para contraste em buttons */
    
    --secondary: #F0EDE8;            /* bg-tertiary */
    --secondary-foreground: #141414; /* text-primary */
    
    --muted: #9A9790;                /* text-muted */
    --muted-foreground: #5C5A56;     /* text-secondary */
    
    --accent: #FF6B00;               /* primary orange */
    --accent-foreground: #ffffff;    /* contraste */
    
    --destructive: #CC4A00;          /* primary-700 (dark orange) */
    --destructive-foreground: #ffffff;
    
    --border: rgba(255, 107, 0, 0.1); /* subtle orange border */
    --input: #F5F3EE;                 /* bg-secondary para inputs */
    --ring: #FF6B00;                  /* focus ring orange */
    
    /* Chart colors (reuse primary scales) */
    --chart-1: #FF6B00;               /* primary-500 */
    --chart-2: #FF7A45;               /* primary-400 */
    --chart-3: #FF8A3D;               /* primary-300 */
    --chart-4: #E55A00;               /* primary-600 */
    --chart-5: #CC4A00;               /* primary-700 */
    
    /* Sidebar tokens */
    --sidebar: #F5F3EE;               /* bg-secondary */
    --sidebar-foreground: #141414;    /* text-primary */
    --sidebar-primary: #FF6B00;       /* accent-primary */
    --sidebar-primary-foreground: #ffffff;
    --sidebar-accent: #F0EDE8;        /* bg-tertiary */
    --sidebar-accent-foreground: #141414;
    --sidebar-border: rgba(255, 107, 0, 0.08);
    --sidebar-ring: #FF6B00;
    
    --radius: 0.75rem;
}
```

---

### 5. Brand Tokens — Color Scales

Remover Dark theme, apenas Light. Limpar escalas.

**REMOVER tudo relacionado a:**
- ❌ `--neutral-950`, `--neutral-900`, `--neutral-800`, `--neutral-700` (dark backgrounds)
- ❌ `--neutral-100` (light text, não mais usado)
- ❌ `--secondary-300` até `--secondary-900` (cyan secondary, removido v1)
- ❌ `--bg-code`, `--cyan`, `--cyan-muted`, `--cyan-glow` (dark theme)

**ADICIONAR novo:**

```css
/* ---- Primary — Orange Quente ---- */
--primary-300: #FF8A3D;     /* Highlights, decorativo */
--primary-400: #FF7A45;     /* Hover states */
--primary-500: #FF6B00;     /* ★ Base — headlines, CTAs, accents */
--primary-600: #E55A00;     /* Pressed, active states */
--primary-700: #CC4A00;     /* Disabled, dark variant */

/* ---- Background — Off-White Warm ---- */
--bg-light: #FEFDFB;        /* Subtle backgrounds, secundário */
--bg-primary: #FAF8F3;      /* ★ Base — fundo dos slides */
--bg-secondary: #F5F3EE;    /* Cards, elevated surfaces */
--bg-tertiary: #F0EDE8;     /* Hover, interactive surfaces */

/* ---- Text — Dark/Neutral ---- */
--text-primary: #141414;    /* ★ Headlines, primary text */
--text-secondary: #5C5A56;  /* Body text, descriptions */
--text-muted: #9A9790;      /* Metadata, secondary info */
```

---

### 6. Semantic Aliases

Limpar e simplificar:

```css
/* ---- Semantic Aliases ---- */

/* Accent */
--accent-primary: var(--primary-500);   /* #FF6B00 */
--accent-light: var(--primary-300);     /* #FF8A3D */
--accent-dark: var(--primary-600);      /* #E55A00 */
--accent-glow: rgba(255, 107, 0, 0.12);

/* Background */
--bg-primary: var(--bg-primary);        /* #FAF8F3 */
--bg-secondary: var(--bg-secondary);    /* #F5F3EE */
--bg-tertiary: var(--bg-tertiary);      /* #F0EDE8 */

/* Text */
--text-primary: var(--text-primary);    /* #141414 */
--text-secondary: var(--text-secondary);/* #5C5A56 */
--text-muted: var(--text-muted);        /* #9A9790 */

/* Border */
--border-subtle: rgba(255, 107, 0, 0.08);    /* subtle orange */
--border-accent: rgba(255, 107, 0, 0.2);     /* orange accent */
```

**REMOVER:**
- ❌ `--secondary`, `--secondary-muted`, `--secondary-glow` (cyan removed)
- ❌ `--accent-light`, `--accent-dark` (use primary-400/600)
- ❌ `--border-secondary` (cyan removed)

---

### 7. Estrutura Final do :root

```css
:root {
    /* ---- Fonts ---- */
    --font-sans: 'Inter', system-ui, sans-serif;
    --font-heading: 'DM Sans', system-ui, sans-serif;
    --font-mono: 'JetBrains Mono', monospace;

    /* ---- Primary — Orange Quente ---- */
    --primary-300: #FF8A3D;
    --primary-400: #FF7A45;
    --primary-500: #FF6B00;
    --primary-600: #E55A00;
    --primary-700: #CC4A00;

    /* ---- Background — Off-White Warm ---- */
    --bg-light: #FEFDFB;
    --bg-primary: #FAF8F3;
    --bg-secondary: #F5F3EE;
    --bg-tertiary: #F0EDE8;

    /* ---- Text — Dark ---- */
    --text-primary: #141414;
    --text-secondary: #5C5A56;
    --text-muted: #9A9790;

    /* ---- Semantic Aliases ---- */
    --accent-primary: var(--primary-500);
    --accent-light: var(--primary-300);
    --accent-dark: var(--primary-600);
    --accent-glow: rgba(255, 107, 0, 0.12);

    --border-subtle: rgba(255, 107, 0, 0.08);
    --border-accent: rgba(255, 107, 0, 0.2);

    /* ---- shadcn Light Mode ---- */
    --background: #FAF8F3;
    --foreground: #141414;
    --card: #F5F3EE;
    --card-foreground: #141414;
    --popover: #FEFDFB;
    --popover-foreground: #141414;
    --primary: #FF6B00;
    --primary-foreground: #ffffff;
    --secondary: #F0EDE8;
    --secondary-foreground: #141414;
    --muted: #9A9790;
    --muted-foreground: #5C5A56;
    --accent: #FF6B00;
    --accent-foreground: #ffffff;
    --destructive: #CC4A00;
    --destructive-foreground: #ffffff;
    --border: rgba(255, 107, 0, 0.1);
    --input: #F5F3EE;
    --ring: #FF6B00;
    --chart-1: #FF6B00;
    --chart-2: #FF7A45;
    --chart-3: #FF8A3D;
    --chart-4: #E55A00;
    --chart-5: #CC4A00;
    --sidebar: #F5F3EE;
    --sidebar-foreground: #141414;
    --sidebar-primary: #FF6B00;
    --sidebar-primary-foreground: #ffffff;
    --sidebar-accent: #F0EDE8;
    --sidebar-accent-foreground: #141414;
    --sidebar-border: rgba(255, 107, 0, 0.08);
    --sidebar-ring: #FF6B00;
    --radius: 0.75rem;
}
```

---

## Passos de Implementação

### Step 1: Google Fonts & Tailwind Theme
- [ ] Atualizar import Google Fonts (remover Orbitron, adicionar DM Sans)
- [ ] Atualizar `@theme inline` (Orbitron → DM Sans)
- [ ] Manter radius e shadcn mappings

### Step 2: Limpar :root (Remover)
- [ ] Remover todos tokens dark theme (`--neutral-950`, `--neutral-900`, etc.)
- [ ] Remover cyan secondary (`--secondary-300` até `--secondary-900`)
- [ ] Remover aliases de dark theme

### Step 3: Adicionar Novos Tokens
- [ ] Adicionar primary scale v1 (300-700)
- [ ] Adicionar background scale (light, primary, secondary, tertiary)
- [ ] Adicionar text scale (primary, secondary, muted)

### Step 4: Atualizar Semantic Aliases
- [ ] Simplificar accent tokens (apenas primary-based)
- [ ] Remover secondary-related aliases
- [ ] Adicionar border utilities

### Step 5: Validar shadcn Mapping
- [ ] Verificar se todos shadcn tokens estão mapeados corretamente
- [ ] Testar light mode em browser

### Step 6: Teste & Validação
- [ ] Build sem erros: `npm run build`
- [ ] TypeCheck: `npm run typecheck`
- [ ] Lint: `npm run lint`
- [ ] Visual check: `npm run dev` e verificar cores nos componentes

---

## Critérios de Sucesso

- ✅ Nenhuma referência a Orbitron em index.css
- ✅ Nenhuma referência a dark theme em index.css
- ✅ DM Sans carregada via Google Fonts
- ✅ Todas cores primárias são orange (#FF6B00 base)
- ✅ Todos backgrounds são off-white (#FAF8F3 base)
- ✅ Todos textos são dark (#141414 base)
- ✅ Build passa sem erros
- ✅ Aplicação renderiza com nova paleta no browser

---

## Riscos & Mitigações

| Risco | Probabilidade | Mitigação |
|-------|---------------|-----------|
| Quebra componentes shadcn | Média | Testar cada componente após build |
| Fonts não carregam | Baixa | Verificar URL do Google Fonts |
| Contraste inadequado | Baixa | Validar WCAG ao testar visualmente |

---

## Próximos Passos

1. Executar refatoração (Step 1-6 acima)
2. Testar Template Cover com nova paleta
3. Iterar até validação visual
4. Commit com mensagem clara das mudanças
