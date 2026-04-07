# Floating Download Button Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mover o botão de download individual para um botão flutuante fixo no canto superior direito de cada slide, e deixar `SlideExportControls` apenas com o botão de exportação global abaixo de todos os slides.

**Architecture:** O botão individual (`exportOne`) é extraído de `SlideExportControls` e colocado em um componente `SlideItem` em `App.tsx`, que instancia `useExport` individualmente por slide. `SlideExportControls` é simplificado para receber apenas `allRefs` e `allFilenames`, usando um novo hook `useExportAll` extraído de `useExport`. `useExport` tem `ref` tornado opcional para separar as responsabilidades de `exportOne` e `exportAll`.

**Tech Stack:** React 19, TypeScript, Tailwind CSS 4, shadcn/ui `<Button>`, Lucide React (`Download` icon), `html-to-image`, sonner (toast).

---

## File Map

| Arquivo | Ação | O que muda |
|---|---|---|
| `src/features/export/useExport.ts` | Modificar | Torna `ref` opcional; sem mudança na lógica |
| `src/features/export/SlideExportControls.tsx` | Modificar | Remove props/lógica individual; usa `useExport` sem `ref` |
| `src/App.tsx` | Modificar | Adiciona `SlideItem` com botão flutuante; move `SlideExportControls` para fora do loop |

---

## Task 1: Tornar `ref` opcional em `useExport`

**Files:**
- Modify: `src/features/export/useExport.ts`

`SlideExportControls` só precisa de `exportAll` — não faz sentido exigir um `ref` individual para isso. Tornar `ref` opcional elimina o workaround `allRefs[0] ?? { current: null }`.

- [ ] **Step 1: Atualizar a assinatura de `useExport`**

Substitua todo o conteúdo de `src/features/export/useExport.ts` por:

```ts
import { toPng } from "html-to-image"
import type { RefObject } from "react"
import { useCallback, useRef, useState } from "react"

interface UseExportOptions {
  filename?: string
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
  const prevTransform = el.style.transform
  const prevTransformOrigin = el.style.transformOrigin
  el.style.transform = "none"
  el.style.transformOrigin = "top left"
  try {
    return await toPng(el, { pixelRatio: 2 })
  } finally {
    el.style.transform = prevTransform
    el.style.transformOrigin = prevTransformOrigin
  }
}

export function useExport(
  ref: RefObject<HTMLDivElement | null> | null,
  allRefs: RefObject<HTMLDivElement | null>[],
  allFilenames: string[],
  options: UseExportOptions = {}
): UseExportReturn {
  const [isExporting, setIsExporting] = useState(false)
  const exportingRef = useRef(false)

  const exportOne = useCallback(async () => {
    if (exportingRef.current || !ref?.current) return
    exportingRef.current = true
    setIsExporting(true)
    try {
      const dataUrl = await captureElement(ref.current)
      triggerDownload(dataUrl, options.filename ?? "slide")
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

- [ ] **Step 2: Verificar typecheck**

```bash
cd "/c/Users/allan victor/Desktop/projetos/design-system-app" && npm run typecheck
```

Esperado: zero erros (outros arquivos que chamam `useExport` com `ref` não-nulo continuam compatíveis, pois `RefObject<HTMLDivElement | null>` é subtipo de `RefObject<HTMLDivElement | null> | null`).

- [ ] **Step 3: Commit**

```bash
cd "/c/Users/allan victor/Desktop/projetos/design-system-app"
git add src/features/export/useExport.ts
git commit -m "refactor: make ref optional in useExport to support export-all-only usage"
```

---

## Task 2: Simplificar `SlideExportControls` para exportação global apenas

**Files:**
- Modify: `src/features/export/SlideExportControls.tsx`

- [ ] **Step 1: Reescrever o componente**

Substitua todo o conteúdo de `src/features/export/SlideExportControls.tsx` por:

```tsx
import { Button } from "@/shared/components/ui/button"
import type { RefObject } from "react"
import { toast } from "sonner"
import { useExport } from "./useExport"

interface SlideExportControlsProps {
  allRefs: RefObject<HTMLDivElement | null>[]
  allFilenames: string[]
}

export function SlideExportControls({
  allRefs,
  allFilenames,
}: SlideExportControlsProps) {
  const { exportAll, isExporting } = useExport(null, allRefs, allFilenames)

  async function handleExportAll() {
    await exportAll()
    toast.success(`${allRefs.length} slides exportados`)
  }

  return (
    <div className="flex justify-center mt-4">
      <Button
        onClick={handleExportAll}
        disabled={isExporting}
        variant="outline"
        size="sm"
        className="cursor-pointer"
      >
        {isExporting ? "Exportando..." : "↓ Todos os slides"}
      </Button>
    </div>
  )
}
```

- [ ] **Step 2: Verificar typecheck**

```bash
cd "/c/Users/allan victor/Desktop/projetos/design-system-app" && npm run typecheck
```

Esperado: zero erros.

- [ ] **Step 3: Commit**

```bash
cd "/c/Users/allan victor/Desktop/projetos/design-system-app"
git add src/features/export/SlideExportControls.tsx
git commit -m "refactor: simplify SlideExportControls to export-all only"
```

---

## Task 3: Adicionar botão flutuante individual e atualizar `App.tsx`

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Atualizar imports em `App.tsx`**

Substitua os imports atuais pelo seguinte:

```tsx
import { createRef, useCallback, useMemo, useRef } from "react"
import { Download } from "lucide-react"
import { toast } from "sonner"
import { SlideExportControls } from "@/features/export/SlideExportControls"
import { useExport } from "@/features/export/useExport"
import { CoverSlide } from "@/features/slides/templates/CoverSlide"
import type { Slide } from "@/features/slides/types"
import { pilotoTestes } from "@/posts/piloto-testes"
import { Button } from "@/shared/components/ui/button"
import { SLIDE_DIMENSIONS, SlideFormat } from "@/shared/enums/slide-format"
```

- [ ] **Step 2: Criar componente `SlideItem` acima de `App`**

Adicione este componente logo após a constante `SCALE` e a função `renderSlide`, antes de `export default function App`. `SlideItem` instancia `useExport` individualmente e usa `useCallback` para estabilizar o handler (sem React Compiler ativo, funções inline são recriadas a cada render):

```tsx
interface SlideItemProps {
  slide: Slide
  format: SlideFormat
  index: number
  total: number
  slideRef: React.RefObject<HTMLDivElement | null>
  width: number
  height: number
  scale: number
  filename: string
  allRefs: React.RefObject<HTMLDivElement | null>[]
  allFilenames: string[]
}

function SlideItem({
  slide,
  format,
  index,
  total,
  slideRef,
  width,
  height,
  scale,
  filename,
  allRefs,
  allFilenames,
}: SlideItemProps) {
  const { exportOne, isExporting } = useExport(slideRef, allRefs, allFilenames, {
    filename,
  })

  const handleExportOne = useCallback(async () => {
    await exportOne()
    toast.success(`${filename}.png exportado`)
  }, [exportOne, filename])

  return (
    <div
      className="relative overflow-hidden rounded-lg shadow-2xl"
      style={{ width: width * scale, height: height * scale }}
    >
      <Button
        size="icon"
        variant="secondary"
        className="absolute top-2 right-2 z-10 cursor-pointer"
        onClick={handleExportOne}
        disabled={isExporting}
        title={`Exportar ${filename}.png`}
      >
        <Download className="h-4 w-4" />
      </Button>
      <div
        ref={slideRef}
        style={{
          width,
          height,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {renderSlide(slide, format, index + 1, total)}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Atualizar o JSX de `App` para usar `SlideItem` e `SlideExportControls` fora do loop**

Substitua o bloco `return` da função `App` por:

```tsx
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
          <SlideItem
            key={i}
            slide={slide}
            format={format}
            index={i}
            total={total}
            slideRef={slideRefs.current[i]}
            width={width}
            height={height}
            scale={SCALE}
            filename={filenames[i]}
            allRefs={slideRefs.current}
            allFilenames={filenames}
          />
        ))}
      </div>

      <SlideExportControls
        allRefs={slideRefs.current}
        allFilenames={filenames}
      />
    </div>
  )
```

- [ ] **Step 4: Verificar typecheck completo**

```bash
cd "/c/Users/allan victor/Desktop/projetos/design-system-app" && npm run typecheck
```

Esperado: zero erros.

- [ ] **Step 5: Verificar no browser**

```bash
npm run dev
```

Abra `http://localhost:5173`. Verifique:
- Cada slide tem um botão com ícone de download fixo no canto superior direito
- Clicar no botão inicia exportação e exibe toast de sucesso
- Abaixo de todos os slides existe apenas um botão "↓ Todos os slides"
- O botão individual fica desabilitado enquanto exporta

- [ ] **Step 6: Commit**

```bash
cd "/c/Users/allan victor/Desktop/projetos/design-system-app"
git add src/App.tsx
git commit -m "feat: add floating download button per slide in top-right corner"
```
