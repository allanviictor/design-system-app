# AVM Slides — Slide Templates Specification

**Versão:** 1.0 (v3 Brand)
**Última atualização:** 2026-04-01

---

## Visão Geral

Cada template é um componente React que recebe props de conteúdo e renderiza dentro de `SlideCanvas`. Todos compartilham os mesmos tokens de design (DM Sans, orange #FF6B00, background #FAF8F3).

**MVP Scope:** Apenas o template **Cover Slide** está implementado nesta versão. Demais templates serão especificados em v1.1+.

---

## Componentes Compartilhados (v1)

| Componente | Função |
|------------|--------|
| `SlideCanvas` | Container com dimensões fixas (1080×1080), background light |
| `Overline` | Categoria do slide (uppercase, letter-spacing, Inter 500, `--text-muted`) |
| `Tag` | Badge com label estilizada |

---

## Template 1: Cover Slide

**Propósito:** Slide de abertura. Atrai atenção no feed, comunica o tema e apresenta o autor.

### Layout

Composição vertical com título, subtítulo, tags e foto (opcional).

```
┌────────────────────────────────────┐
│                                    │
│  ── OVERLINE                       │
│                                    │
│  HEADLINE em DM Sans               │
│  com palavra em orange             │
│                                    │
│  ─── accent bar orange             │
│                                    │
│  Subtítulo descritivo              │
│  em Inter, 1-2 linhas              │
│                                    │
│  [tag1] [tag2] [tag3]              │
│                                    │
│  (foto com vignette opcional)      │
│                                    │
└────────────────────────────────────┘
```

### Props

```typescript
interface CoverSlideProps {
  overline: string;           // Ex: "IA · AGENTES · SDK"
  headline: string;           // Ex: "Programação com Agentes de IA"
  highlightWords?: string[];  // Palavras da headline em --primary-500
  subtitle: string;           // 1-2 frases descritivas
  tags?: string[];            // Ex: ["IA", "Agentes", "SDK"]
  authorPhoto?: string;       // URL da foto (opcional — placeholder se omitido)
  currentSlide?: number;      // Para paginação (futura)
  totalSlides?: number;       // Para paginação (futura)
}
```

### Regras Visuais

**Tipografia:**
- Overline: Inter 500, `--text-muted`, uppercase, letter-spacing 1.5px
- Headline: DM Sans 700, `--text-primary`, 52px, line-height 1.1
  - `highlightWords` recebem `--primary-500` (#FF6B00)
- Subtitle: Inter 400, `--text-secondary`, 18px, line-height 1.6
- Tags: Inter 500, 13px, `--primary-500` com bg rgba(#FF6B00, 0.1)

**Cores:**
- Background: `--bg-primary` (#FAF8F3)
- Accent bar: `--primary-500` (#FF6B00), 6px altura
- Texto: `--text-primary` (#141414), `--text-secondary` (#5C5A56)

**Layout:**
- Padding: 40px-50px (horizontal), 40px-60px (vertical)
- Espaçamento vertical entre elementos: 20-30px
- Accent bar: 80px de largura
- Tags: gap 10px, flex-wrap

**Foto (opcional):**
- Se fornecida: renderiza com vignette suave
- Se não: placeholder com ícone/texto
- Max-height: 300px, object-fit cover

### Notas de Evolução

Este é o template inicial do MVP. Refinamentos visuais (proporções, spacing, efeitos) serão feitos em iterações futuras com feedback visual.

---

## Futuros Templates (v1.1+)

Serão especificados quando necessário:
- **Content Slide** — Conteúdo + bullet points
- **Code Slide** — Bloco de código com syntax highlighting
- **Comparison Slide** — Lado a lado (antes/depois, A/B)
- **Closing Slide** — CTA e encerramento
