# Export Pipeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adicionar exportação de slides como PNG (individual e batch) com botões contextuais abaixo de cada slide, feedback de loading e toast de confirmação.

**Architecture:** Hook `useExport` encapsula toda lógica de html-to-image + download + estado. Componente `SlideExportControls` consome o hook e renderiza os botões. `App.tsx` cria os refs e passa os filenames baseados em `carousel.slug + slide.type`.

**Tech Stack:** `html-to-image`, `sonner` (via shadcn), React refs, TypeScript strict.

---

## File Map

| Ação | Arquivo | Responsabilidade |
|------|---------|-----------------|
| Create | `src/features/export/useExport.ts` | Lógica: toPng, download, estado isExporting |
| Create | `src/features/export/SlideExportControls.tsx` | UI: botões "Este slide" / "Todos os slides" |
| Modify | `src/features/slides/types/index.ts` | Adiciona campo `slug` ao tipo `Carousel` |
| Modify | `src/posts/piloto-testes/index.ts` | Adiciona `slug: "piloto-testes"` ao dado |
| Modify | `src/App.tsx` | Cria refs, gera filenames, renderiza SlideExportControls |
| Modify | `src/main.tsx` | Adiciona `<Toaster />` do sonner |

---

## Task 1: Instalar dependências

**Files:**
- Modify: `package.json` (via npm)

- [ ] **Step 1: Instalar html-to-image**

```bash
npm install html-to-image
```

Saída esperada: `added 1 package` (sem erros).

- [ ] **Step 2: Instalar sonner via shadcn**

```bash
npx shadcn@latest add sonner
```

Aceitar prompts padrão. Isso gera `src/shared/components/ui/sonner.tsx`.

- [ ] **Step 3: Verificar instalação**

```bash
npm run typecheck
```

Saída esperada: sem erros de tipo.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json src/shared/components/ui/sonner.tsx
git commit -m "chore: install html-to-image and add sonner component"
```

---

## Task 2: Adicionar `slug` ao tipo Carousel e ao dado

**Files:**
- Modify: `src/features/slides/types/index.ts:22-26`
- Modify: `src/posts/piloto-testes/index.ts`

- [ ] **Step 1: Adicionar `slug` ao tipo Carousel**

Em `src/features/slides/types/index.ts`, alterar a interface `Carousel`:

```typescript
export interface Carousel {
  title: string
  slug: string
  format: SlideFormat
  slides: Slide[]
}
```

- [ ] **Step 2: Adicionar `slug` ao dado piloto-testes**

Em `src/posts/piloto-testes/index.ts`:

```typescript
import type { Carousel } from "@/features/slides/types"
import { SlideFormat } from "@/shared/enums/slide-format"

export const pilotoTestes: Carousel = {
  title: "Programação com Agentes de IA",
  slug: "piloto-testes",
  format: SlideFormat.Square,
  slides: [
    {
      type: "cover",
      overline: "IA · AGENTES · SDK",
      headline: "Programação com Agentes de IA",
      highlightWords: ["Agentes"],
      subtitle:
        "Como LLMs com ferramentas estão mudando a forma de construir software",
      tags: ["IA", "Agentes", "LLM", "TypeScript"],
      authorPhoto: "/src/assets/img-cover.png",
    },
  ],
}
```

- [ ] **Step 3: Verificar tipos**

```bash
npm run typecheck
```

Saída esperada: sem erros.

- [ ] **Step 4: Commit**

```bash
git add src/features/slides/types/index.ts src/posts/piloto-testes/index.ts
git commit -m "feat: add slug field to Carousel type and piloto-testes data"
```

---

## Task 3: Implementar o hook useExport

**Files:**
- Create: `src/features/export/useExport.ts`

- [ ] **Step 1: Criar o arquivo do hook**

Criar `src/features/export/useExport.ts` com o seguinte conteúdo:

```typescript
import { toPng } from "html-to-image"
import { RefObject, useCallback, useRef, useState } from "react"

interface UseExportOptions {
  filename: string
}

interface UseExportReturn {
  exportOne: () => Promise<void>
  exportAll: () => Promise<void>
  isExporting: boolean
}

function triggerDownload(dataUrl: string, filename: string) {
  const a = document.createElement("a")
  a.href = dataUrl
  a.download = `${filename}.png`
  a.click()
}

async function captureElement(el: HTMLElement): Promise<string> {
  await document.fonts.ready
  return toPng(el, { pixelRatio: 2 })
}

export function useExport(
  ref: RefObject<HTMLDivElement | null>,
  allRefs: RefObject<HTMLDivElement | null>[],
  allFilenames: string[],
  options: UseExportOptions,
): UseExportReturn {
  const [isExporting, setIsExporting] = useState(false)
  const exportingRef = useRef(false)

  const exportOne = useCallback(async () => {
    if (exportingRef.current || !ref.current) return
    exportingRef.current = true
    setIsExporting(true)
    try {
      const dataUrl = await captureElement(ref.current)
      triggerDownload(dataUrl, options.filename)
    } finally {
      exportingRef.current = false
      setIsExporting(false)
    }
  }, [ref, options.filename])

  const exportAll = useCallback(async () => {
    if (exportingRef.current) return
    exportingRef.current = true
    setIsExporting(true)
    try {
      for (let i = 0; i < allRefs.length; i++) {
        const el = allRefs[i].current
        if (!el) continue
        const dataUrl = await captureElement(el)
        triggerDownload(dataUrl, allFilenames[i])
      }
    } finally {
      exportingRef.current = false
      setIsExporting(false)
    }
  }, [allRefs, allFilenames])

  return { exportOne, exportAll, isExporting }
}
```

- [ ] **Step 2: Verificar tipos**

```bash
npm run typecheck
```

Saída esperada: sem erros.

- [ ] **Step 3: Commit**

```bash
git add src/features/export/useExport.ts
git commit -m "feat: implement useExport hook with exportOne and exportAll"
```

---

## Task 4: Implementar SlideExportControls

**Files:**
- Create: `src/features/export/SlideExportControls.tsx`

- [ ] **Step 1: Criar o componente**

Criar `src/features/export/SlideExportControls.tsx`:

```typescript
import { useExport } from "./useExport"
import { RefObject } from "react"
import { toast } from "sonner"

interface SlideExportControlsProps {
  slideRef: RefObject<HTMLDivElement | null>
  filename: string
  allRefs: RefObject<HTMLDivElement | null>[]
  allFilenames: string[]
}

export function SlideExportControls({
  slideRef,
  filename,
  allRefs,
  allFilenames,
}: SlideExportControlsProps) {
  const { exportOne, exportAll, isExporting } = useExport(
    slideRef,
    allRefs,
    allFilenames,
    { filename },
  )

  async function handleExportOne() {
    await exportOne()
    toast.success(`${filename}.png exportado`)
  }

  async function handleExportAll() {
    await exportAll()
    toast.success(`${allRefs.length} slides exportados`)
  }

  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        justifyContent: "center",
        marginTop: 12,
      }}
    >
      <button
        onClick={handleExportOne}
        disabled={isExporting}
        style={{
          padding: "6px 14px",
          background: isExporting ? "rgba(255,107,0,0.6)" : "#FF6B00",
          color: "white",
          border: "none",
          borderRadius: 6,
          fontSize: 12,
          fontFamily: "Inter, sans-serif",
          fontWeight: 500,
          cursor: isExporting ? "not-allowed" : "pointer",
          transition: "background 0.15s",
        }}
      >
        {isExporting ? "Exportando..." : "↓ Este slide"}
      </button>
      <button
        onClick={handleExportAll}
        disabled={isExporting}
        style={{
          padding: "6px 14px",
          background: "transparent",
          color: isExporting ? "#9A9790" : "#5C5A56",
          border: "1px solid rgba(0,0,0,0.15)",
          borderRadius: 6,
          fontSize: 12,
          fontFamily: "Inter, sans-serif",
          fontWeight: 500,
          cursor: isExporting ? "not-allowed" : "pointer",
          opacity: isExporting ? 0.5 : 1,
          transition: "opacity 0.15s",
        }}
      >
        ↓ Todos os slides
      </button>
    </div>
  )
}
```

- [ ] **Step 2: Verificar tipos**

```bash
npm run typecheck
```

Saída esperada: sem erros.

- [ ] **Step 3: Commit**

```bash
git add src/features/export/SlideExportControls.tsx
git commit -m "feat: add SlideExportControls component with loading state"
```

---

## Task 5: Adicionar Toaster ao main.tsx

**Files:**
- Modify: `src/main.tsx`

- [ ] **Step 1: Ler o arquivo atual**

Ler `src/main.tsx` para ver o conteúdo atual antes de editar.

- [ ] **Step 2: Adicionar Toaster**

Adicionar o import do `Toaster` e renderizá-lo ao lado de `<App />`. O arquivo deve ficar assim (adaptar se o conteúdo atual diferir):

```typescript
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Toaster } from "@/shared/components/ui/sonner"
import "./index.css"
import App from "./App.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Toaster position="bottom-right" richColors />
  </StrictMode>,
)
```

- [ ] **Step 3: Verificar tipos**

```bash
npm run typecheck
```

Saída esperada: sem erros.

- [ ] **Step 4: Commit**

```bash
git add src/main.tsx
git commit -m "feat: add Toaster to app root for export notifications"
```

---

## Task 6: Integrar SlideExportControls em App.tsx

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Ler o arquivo atual**

Ler `src/App.tsx` para ver o conteúdo atual antes de editar.

- [ ] **Step 2: Atualizar App.tsx**

Substituir o conteúdo de `src/App.tsx` pelo seguinte:

```typescript
import { createRef, useRef } from "react"
import { SlideExportControls } from "@/features/export/SlideExportControls"
import { CoverSlide } from "@/features/slides/templates/CoverSlide"
import type { Slide } from "@/features/slides/types"
import { pilotoTestes } from "@/posts/piloto-testes"
import { SLIDE_DIMENSIONS, SlideFormat } from "@/shared/enums/slide-format"

const SCALE = 0.5

function renderSlide(
  slide: Slide,
  format: SlideFormat,
  currentSlide: number,
  totalSlides: number,
) {
  const base = { format, currentSlide, totalSlides }
  switch (slide.type) {
    case "cover":
      return <CoverSlide {...slide} {...base} />
  }
}

export default function App() {
  const { slides, format, slug } = pilotoTestes
  const { width, height } = SLIDE_DIMENSIONS[format]
  const total = slides.length

  const slideRefs = useRef(slides.map(() => createRef<HTMLDivElement>()))
  const filenames = slides.map((s) => `${slug}-${s.type}`)

  return (
    <div className="flex min-h-svh flex-col items-center gap-8 bg-background py-16">
      <div className="flex flex-col items-center gap-1">
        <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          {slug}
        </p>
        <h1 className="text-sm font-medium text-foreground">
          {pilotoTestes.title}
        </h1>
      </div>

      <div className="flex flex-col gap-6">
        {slides.map((slide, i) => (
          <div key={i}>
            <div
              style={{
                width: width * SCALE,
                height: height * SCALE,
                position: "relative",
                overflow: "hidden",
                borderRadius: 8,
                boxShadow:
                  "0 0 0 1px rgba(255,255,255,0.06), 0 24px 48px rgba(0,0,0,0.5)",
              }}
            >
              <div
                ref={slideRefs.current[i]}
                style={{
                  width,
                  height,
                  transform: `scale(${SCALE})`,
                  transformOrigin: "top left",
                }}
              >
                {renderSlide(slide, format, i + 1, total)}
              </div>
            </div>
            <SlideExportControls
              slideRef={slideRefs.current[i]}
              filename={filenames[i]}
              allRefs={slideRefs.current}
              allFilenames={filenames}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
```

**Atenção:** O `ref` que passamos para `SlideExportControls` aponta para o `div` interno (tamanho real 1080px), não para o wrapper escalado. Isso é intencional — html-to-image precisa capturar o elemento no tamanho real para o pixelRatio: 2 funcionar corretamente.

- [ ] **Step 3: Verificar tipos e build**

```bash
npm run typecheck && npm run build
```

Saída esperada: sem erros de tipo, build bem-sucedido.

- [ ] **Step 4: Testar manualmente no browser**

```bash
npm run dev
```

Verificar:
1. Botões "↓ Este slide" e "↓ Todos os slides" aparecem abaixo do slide
2. Clicar "Este slide" → botão muda para "Exportando..." → download de `piloto-testes-cover.png` → toast "piloto-testes-cover.png exportado"
3. Clicar "Todos os slides" → mesmo comportamento → toast "1 slides exportados"
4. Durante export, ambos os botões ficam desabilitados
5. PNG exportado tem 2160×2160px (1080 × pixelRatio 2) com fontes corretas

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx
git commit -m "feat: integrate SlideExportControls into App — export pipeline complete"
```

---

## Fallback: Fontes não renderizam no PNG

Se ao testar (Task 6, Step 4) as fontes no PNG aparecerem como fallback do sistema em vez de DM Sans/Inter/JetBrains Mono, executar este fallback:

- [ ] **Instalar fontes via npm (elimina dependência de CDN)**

```bash
npm install @fontsource-variable/dm-sans @fontsource-variable/inter @fontsource-variable/jetbrains-mono
```

- [ ] **Substituir @import do Google Fonts em `src/index.css`**

Remover a linha:
```css
@import url("https://fonts.googleapis.com/css2?...");
```

Adicionar no topo de `src/index.css`:
```css
@import "@fontsource-variable/dm-sans";
@import "@fontsource-variable/inter";
@import "@fontsource-variable/jetbrains-mono";
```

- [ ] **Verificar e commitar**

```bash
npm run typecheck && npm run build
git add src/index.css package.json package-lock.json
git commit -m "fix: replace Google Fonts CDN with @fontsource packages for export compatibility"
```
