# Cover Slide v3 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reescrever o template Cover Slide v3 com layout split horizontal (texto esquerda / foto direita + fade suave), usando Tailwind + tokens semânticos do shadcn, com componentes isolados e reutilizáveis.

**Architecture:** Componentes compartilhados (`Tag`, `SlideFooter`) são reescritos com Tailwind classes e tokens semânticos CSS. `CoverSlide` encapsula esses componentes e usa inline styles apenas onde Tailwind não é suficiente (gradientes complexos do `html-to-image`). A pasta intermediária `features/slides/components/` é removida — canvas e templates passam para `features/slides/canvas/` e `features/slides/templates/` diretamente.

**Tech Stack:** React 18, TypeScript strict, Tailwind v4, shadcn/ui (Badge como base do Tag), `class-variance-authority`, `cn()`, inline styles apenas para gradientes e valores calculados por formato.

---

## File Map

| Arquivo | Ação | Responsabilidade |
|---------|------|-----------------|
| `src/shared/components/ui/badge.tsx` | Criar (shadcn) | Base shadcn do Badge — gerado via CLI |
| `src/shared/components/Tag.tsx` | Reescrever | Tag customizado com variants `orange` e `neutral`, baseado no Badge |
| `src/shared/components/SlideFooter.tsx` | Reescrever | Footer de slide: nome autor + separador + paginação |
| `src/shared/components/Overline.tsx` | Reescrever | Label overline: barra laranja + texto JetBrains Mono |
| `src/shared/components/AccentBar.tsx` | Reescrever | Barra decorativa laranja, largura e alinhamento via props |
| `src/features/slides/canvas/SlideCanvas.tsx` | Mover + manter | Container com dimensões fixas — apenas muda o path |
| `src/features/slides/templates/CoverSlide.tsx` | Mover + reescrever | Template Cover v3 — encapsula os shared components |
| `src/features/slides/components/` | Deletar (pasta vazia após moves) | Estrutura intermediária removida |
| `src/App.tsx` | Atualizar import | Aponta para novo path do CoverSlide |
| `src/posts/piloto-testes/index.ts` | Atualizar `authorPhoto` | Trocar URL Unsplash pela foto local `foto-allan.jpg` |

---

## Task 1: Instalar Badge do shadcn

O `Tag` customizado vai ser construído em cima do `Badge` do shadcn. Instalar o componente base primeiro.

**Files:**
- Create: `src/shared/components/ui/badge.tsx` (gerado pelo CLI)

- [ ] **Step 1: Instalar o Badge**

```bash
npx shadcn@latest add badge
```

Esperado: arquivo criado em `src/shared/components/ui/badge.tsx` (o alias `ui` está mapeado para esse path no `components.json`).

- [ ] **Step 2: Verificar o arquivo gerado**

```bash
npm run typecheck
```

Esperado: sem erros.

- [ ] **Step 3: Commit**

```bash
git add src/shared/components/ui/badge.tsx
git commit -m "chore: add shadcn Badge component"
```

---

## Task 2: Reescrever Tag.tsx

`Tag` é um badge semântico com duas variantes: `orange` (destaque primário) e `neutral` (secundário). Construído sobre o `Badge` do shadcn, customizado com tokens da marca.

**Files:**
- Modify: `src/shared/components/Tag.tsx`

- [ ] **Step 1: Reescrever Tag.tsx**

Substitua o conteúdo completo de `src/shared/components/Tag.tsx` por:

```tsx
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const tagVariants = cva(
  "inline-flex items-center rounded-full font-semibold transition-colors",
  {
    variants: {
      variant: {
        orange: "bg-primary/10 text-primary border border-primary/25 font-mono text-[13px] px-4 py-1.5",
        neutral: "bg-foreground/7 text-muted-foreground border border-foreground/10 font-mono text-[13px] px-4 py-1.5",
      },
    },
    defaultVariants: {
      variant: "orange",
    },
  }
)

interface TagProps extends VariantProps<typeof tagVariants> {
  children: React.ReactNode
  className?: string
}

export function Tag({ children, variant, className }: TagProps) {
  return (
    <span className={cn(tagVariants({ variant }), className)}>
      {children}
    </span>
  )
}
```

- [ ] **Step 2: Verificar typecheck**

```bash
npm run typecheck
```

Esperado: sem erros em `Tag.tsx`.

- [ ] **Step 3: Commit**

```bash
git add src/shared/components/Tag.tsx
git commit -m "feat: rewrite Tag with Tailwind variants (orange, neutral)"
```

---

## Task 3: Reescrever SlideFooter.tsx

Footer padronizado de slide: nome do autor + separador vertical + paginação. Posicionado absolutamente no canto inferior esquerdo.

**Files:**
- Modify: `src/shared/components/SlideFooter.tsx`

- [ ] **Step 1: Reescrever SlideFooter.tsx**

Substitua o conteúdo completo de `src/shared/components/SlideFooter.tsx` por:

```tsx
import { cn } from "@/lib/utils"

interface SlideFooterProps {
  author?: string
  currentSlide: number
  totalSlides: number
  className?: string
}

export function SlideFooter({
  author = "allan victor",
  currentSlide,
  totalSlides,
  className,
}: SlideFooterProps) {
  const pad = (n: number) => String(n).padStart(2, "0")

  return (
    <div
      className={cn(
        "absolute bottom-12 left-18 flex items-center gap-4 z-4",
        className
      )}
    >
      <span className="font-mono text-[13px] font-medium text-muted-foreground">
        {author}
      </span>
      <div className="w-px h-4 bg-primary/25" />
      <span className="font-mono text-[13px] font-medium text-muted-foreground">
        {pad(currentSlide)} / {pad(totalSlides)}
      </span>
    </div>
  )
}
```

- [ ] **Step 2: Verificar typecheck**

```bash
npm run typecheck
```

Esperado: sem erros em `SlideFooter.tsx`.

- [ ] **Step 3: Commit**

```bash
git add src/shared/components/SlideFooter.tsx
git commit -m "feat: rewrite SlideFooter with Tailwind tokens"
```

---

## Task 4: Reescrever Overline.tsx

Overline com barra decorativa laranja à esquerda + texto em JetBrains Mono uppercase. Usado no topo do conteúdo de slides.

**Files:**
- Modify: `src/shared/components/Overline.tsx`

- [ ] **Step 1: Reescrever Overline.tsx**

Substitua o conteúdo completo de `src/shared/components/Overline.tsx` por:

```tsx
import { cn } from "@/lib/utils"

interface OverlineProps {
  children: React.ReactNode
  className?: string
}

export function Overline({ children, className }: OverlineProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="w-0.75 h-5 bg-primary rounded-sm shrink-0" />
      <span className="font-mono text-[14px] font-medium uppercase tracking-[0.28em] text-primary/80">
        {children}
      </span>
    </div>
  )
}
```

- [ ] **Step 2: Verificar typecheck**

```bash
npm run typecheck
```

- [ ] **Step 3: Commit**

```bash
git add src/shared/components/Overline.tsx
git commit -m "feat: rewrite Overline with Tailwind tokens"
```

---

## Task 5: Reescrever AccentBar.tsx

Barra decorativa laranja usada abaixo do headline. Largura fixa, gradiente da marca.

**Files:**
- Modify: `src/shared/components/AccentBar.tsx`

- [ ] **Step 1: Reescrever AccentBar.tsx**

Substitua o conteúdo completo de `src/shared/components/AccentBar.tsx` por:

```tsx
import { cn } from "@/lib/utils"

interface AccentBarProps {
  className?: string
}

export function AccentBar({ className }: AccentBarProps) {
  return (
    <div
      className={cn("h-1.25 w-16 rounded-full", className)}
      style={{ background: "var(--gradient-accent)" }}
    />
  )
}
```

**Nota:** `background` com gradiente usa inline style — Tailwind não gera gradientes customizados de variáveis CSS sem JIT arbitrário, e o `html-to-image` precisa do valor resolvido.

- [ ] **Step 2: Verificar typecheck**

```bash
npm run typecheck
```

- [ ] **Step 3: Commit**

```bash
git add src/shared/components/AccentBar.tsx
git commit -m "feat: rewrite AccentBar with Tailwind + gradient token"
```

---

## Task 6: Mover SlideCanvas para novo path

Remover a pasta intermediária `components/` de `features/slides`. O `SlideCanvas` passa de `features/slides/components/canvas/` para `features/slides/canvas/`.

**Files:**
- Create: `src/features/slides/canvas/SlideCanvas.tsx`
- Delete: `src/features/slides/components/canvas/SlideCanvas.tsx`

- [ ] **Step 1: Criar o novo arquivo no path correto**

Crie `src/features/slides/canvas/SlideCanvas.tsx` com o mesmo conteúdo do arquivo atual:

```tsx
import { cn } from "@/lib/utils"
import { SlideFormat, SLIDE_DIMENSIONS } from "@/shared/enums/slide-format"

interface SlideCanvasProps {
  format?: SlideFormat
  children: React.ReactNode
  className?: string
  id?: string
}

export function SlideCanvas({
  format = SlideFormat.Square,
  children,
  className,
  id,
}: SlideCanvasProps) {
  const { width, height } = SLIDE_DIMENSIONS[format]

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      id={id}
      style={{
        width,
        height,
        backgroundColor: "var(--bg-primary)",
        fontFamily: "var(--font-body)",
        color: "var(--text-primary)",
      }}
    >
      {children}
    </div>
  )
}
```

- [ ] **Step 2: Deletar o arquivo antigo**

```bash
rm "src/features/slides/components/canvas/SlideCanvas.tsx"
rmdir "src/features/slides/components/canvas"
```

- [ ] **Step 3: Verificar typecheck**

```bash
npm run typecheck
```

Esperado: erro de import em `CoverSlide.tsx` (ainda aponta para o path antigo) — será corrigido na Task 7.

- [ ] **Step 4: Commit parcial**

```bash
git add src/features/slides/canvas/SlideCanvas.tsx
git rm src/features/slides/components/canvas/SlideCanvas.tsx
git commit -m "refactor: move SlideCanvas to features/slides/canvas/"
```

---

## Task 7: Reescrever e mover CoverSlide para novo path

`CoverSlide` passa de `features/slides/components/templates/` para `features/slides/templates/`. O componente é reescrito com o layout split v3, usando os shared components das Tasks 2–5.

**Files:**
- Create: `src/features/slides/templates/CoverSlide.tsx`
- Delete: `src/features/slides/components/templates/CoverSlide.tsx`

- [ ] **Step 1: Criar src/features/slides/templates/CoverSlide.tsx**

```tsx
import {
  SlideFormat,
  type CoverSlide as CoverSlideData,
} from "@/features/slides/types"
import { AccentBar } from "@/shared/components/AccentBar"
import { Overline } from "@/shared/components/Overline"
import { SlideFooter } from "@/shared/components/SlideFooter"
import { Tag } from "@/shared/components/Tag"
import { highlightWords } from "@/shared/lib/highlight"
import { SlideCanvas } from "../canvas/SlideCanvas"

interface CoverSlideProps extends CoverSlideData {
  format?: SlideFormat
  currentSlide: number
  totalSlides: number
}

export function CoverSlide({
  format = SlideFormat.Square,
  overline,
  headline,
  highlightWords: words,
  subtitle,
  tags,
  authorPhoto,
  currentSlide,
  totalSlides,
}: CoverSlideProps) {
  const isVertical = format === SlideFormat.Vertical

  const headlineSize = isVertical ? "84px" : "72px"
  const contentPadding = isVertical ? "96px 80px" : "80px 72px"
  const subtitleSize = isVertical ? "22px" : "20px"
  const footerBottom = isVertical ? "64px" : "48px"
  const footerLeft = isVertical ? "80px" : "72px"

  return (
    <SlideCanvas format={format}>

      {/* Foto — direita, 52% */}
      {authorPhoto && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "52%",
            height: "100%",
            overflow: "hidden",
            zIndex: 1,
          }}
        >
          <img
            src={authorPhoto}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
              display: "block",
            }}
          />
        </div>
      )}

      {/* Fade — dissolução suave foto → bg */}
      {authorPhoto && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "52%",
            height: "100%",
            background:
              "linear-gradient(to right, var(--bg-primary) 0%, rgba(250,248,243,0.90) 15%, rgba(250,248,243,0.75) 30%, rgba(250,248,243,0.50) 45%, rgba(250,248,243,0.25) 60%, rgba(250,248,243,0.12) 75%, rgba(250,248,243,0.06) 85%, transparent 100%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Conteúdo — esquerda, 68% */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "68%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: contentPadding,
          zIndex: 3,
        }}
      >
        {overline && (
          <Overline className="mb-7">
            {overline}
          </Overline>
        )}

        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: headlineSize,
            fontWeight: 700,
            lineHeight: 1.05,
            margin: 0,
            marginBottom: "24px",
            color: "var(--text-primary)",
          }}
          dangerouslySetInnerHTML={{
            __html: highlightWords(headline, words),
          }}
        />

        <AccentBar className="mb-7" />

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: subtitleSize,
            fontWeight: 400,
            lineHeight: 1.6,
            color: "var(--text-secondary)",
            margin: 0,
            marginBottom: "36px",
            maxWidth: "480px",
          }}
        >
          {subtitle}
        </p>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2.5">
            {tags.map((tag, i) => (
              <Tag key={tag} variant={i === 0 ? "orange" : "neutral"}>
                {tag}
              </Tag>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <SlideFooter
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        style={{
          bottom: footerBottom,
          left: footerLeft,
        }}
      />

    </SlideCanvas>
  )
}
```

**Nota:** `h1` e `p` (subtitle) usam inline styles porque dependem de valores calculados por `isVertical`. `Overline`, `AccentBar`, `SlideFooter` e `Tag` usam Tailwind.

- [ ] **Step 2: Atualizar SlideFooter para aceitar `style` prop**

O `CoverSlide` precisa passar `bottom` e `left` variáveis ao `SlideFooter`. Adicione `style?: React.CSSProperties` ao `SlideFooter`:

```tsx
import { cn } from "@/lib/utils"

interface SlideFooterProps {
  author?: string
  currentSlide: number
  totalSlides: number
  className?: string
  style?: React.CSSProperties
}

export function SlideFooter({
  author = "allan victor",
  currentSlide,
  totalSlides,
  className,
  style,
}: SlideFooterProps) {
  const pad = (n: number) => String(n).padStart(2, "0")

  return (
    <div
      className={cn(
        "absolute flex items-center gap-4 z-4",
        className
      )}
      style={style}
    >
      <span className="font-mono text-[13px] font-medium text-muted-foreground">
        {author}
      </span>
      <div className="w-px h-4 bg-primary/25" />
      <span className="font-mono text-[13px] font-medium text-muted-foreground">
        {pad(currentSlide)} / {pad(totalSlides)}
      </span>
    </div>
  )
}
```

- [ ] **Step 3: Deletar o arquivo antigo do CoverSlide**

```bash
rm "src/features/slides/components/templates/CoverSlide.tsx"
rmdir "src/features/slides/components/templates"
rmdir "src/features/slides/components"
```

- [ ] **Step 4: Verificar typecheck — esperado erro em App.tsx**

```bash
npm run typecheck
```

Esperado: erro de import em `App.tsx` — corrigido na Task 8.

- [ ] **Step 5: Commit**

```bash
git add src/features/slides/templates/CoverSlide.tsx
git add src/shared/components/SlideFooter.tsx
git rm src/features/slides/components/templates/CoverSlide.tsx
git commit -m "feat: rewrite CoverSlide v3 — split layout, shared components"
```

---

## Task 8: Atualizar App.tsx e piloto-testes

Corrigir o import do `CoverSlide` no `App.tsx` para o novo path. Atualizar `piloto-testes` para usar a foto local do autor.

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/posts/piloto-testes/index.ts`

- [ ] **Step 1: Atualizar import em App.tsx**

Em `src/App.tsx`, altere a linha:

```tsx
// de:
import { CoverSlide } from "@/features/slides/components/templates/CoverSlide"
// para:
import { CoverSlide } from "@/features/slides/templates/CoverSlide"
```

- [ ] **Step 2: Atualizar authorPhoto em piloto-testes**

Em `src/posts/piloto-testes/index.ts`, troque a URL do Unsplash pela foto local:

```tsx
// de:
authorPhoto: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&h=800&fit=crop",
// para:
authorPhoto: "/src/assets/foto-allan.jpg",
```

- [ ] **Step 3: Verificar typecheck limpo**

```bash
npm run typecheck
```

Esperado: zero erros.

- [ ] **Step 4: Verificar no dev server**

```bash
npm run dev
```

Abrir `http://localhost:5173`. Verificar:
- Fundo off-white `#FAF8F3`
- Foto do autor à direita com fade suave
- Overline com barra laranja + texto JetBrains Mono
- Headline DM Sans 700 com palavra em laranja
- Accent bar laranja
- Subtitle em `--text-secondary`
- Tags: primeira `orange`, demais `neutral`
- Footer com nome e paginação em `--text-muted`

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx src/posts/piloto-testes/index.ts
git commit -m "fix: update imports and use local author photo"
```

---

## Self-Review

**Cobertura da spec (`docs/templates/cover/spec.md`):**
- ✅ Foto 52% direita, `object-position: center top`
- ✅ Fade 8 stops lineares de `--bg-primary` → transparent
- ✅ Conteúdo 68%, padding square `80px 72px` / vertical `96px 80px`
- ✅ Overline: JetBrains Mono, barra 3px laranja, `--primary-400`
- ✅ Headline: DM Sans 700, 72px/84px, `highlight` via `highlightWords()`
- ✅ Accent bar: 64px × 5px, gradiente `--gradient-accent`
- ✅ Subtitle: 20px/22px, `--text-secondary`, max-width 480px
- ✅ Tags: variant `orange` (primeiro) e `neutral` (demais)
- ✅ Footer: bottom/left variáveis por formato, `--text-muted`, separador `primary/25`
- ✅ Formatos square e vertical com valores responsivos via `isVertical`

**Instrução do usuário:**
- ✅ Tokens semânticos Tailwind/shadcn (não inline styles arbitrários)
- ✅ `Tag` com variants `orange` e `neutral`
- ✅ `SlideFooter` isolado em `shared/components`
- ✅ `Overline`, `AccentBar` reescritos com Tailwind
- ✅ shadcn `Badge` instalado como base (Task 1)
- ✅ Pasta `features/slides/components/` removida
- ✅ `canvas/` e `templates/` direto em `features/slides/`
- ✅ Shared components em `shared/components/`
- ✅ shadcn ui em `shared/components/ui/`

**Tipos consistentes:**
- `Tag` variant: `"orange" | "neutral"` — consistente entre Tasks 2 e 7
- `SlideFooter` props: `style?: React.CSSProperties` adicionado na Task 7 step 2, antes do uso
- `CoverSlide` importa `SlideCanvas` via `"../canvas/SlideCanvas"` — path relativo correto no novo layout de pastas
- `highlightWords` helper: importado de `@/shared/lib/highlight` — path existente e inalterado

**Sem placeholders:** todos os steps têm código completo.
