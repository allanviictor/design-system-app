import { SlideExportControls } from "@/features/export/SlideExportControls"
import { CoverSlide } from "@/features/slides/templates/CoverSlide"
import { registry } from "@/posts/registry"
import { Button } from "@/shared/components/ui/button"
import { SLIDE_DIMENSIONS } from "@/shared/enums/slide-format"
import { useExport } from "@/shared/hooks/useExport"
import type { Slide, SlideFormat } from "@/shared/types"
import { Download } from "lucide-react"
import { memo, useCallback, useRef } from "react"
import { useParams } from "react-router-dom"
import { toast } from "sonner"

const SCALE = 0.5

function renderSlide(
  slide: Slide,
  format: SlideFormat,
  currentSlide: number,
  totalSlides: number
) {
  const base = { format, currentSlide, totalSlides }
  switch (slide.type) {
    case "cover":
      return <CoverSlide {...slide} {...base} />
  }
}

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

const SlideItem = memo(function SlideItem({
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
})

export function PostPage() {
  const { slug } = useParams<{ slug: string }>()
  const carousel = slug ? registry[slug] : undefined

  if (!carousel) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <p className="text-muted-foreground">Post não encontrado.</p>
      </div>
    )
  }

  const { slides, format } = carousel
  const { width, height } = SLIDE_DIMENSIONS[format]
  const total = slides.length

  // useRef para array de refs estável — createRef é para class components
  const slideRefs = useRef<React.RefObject<HTMLDivElement | null>[]>(
    slides.map(() => ({ current: null }))
  ).current
  const filenames = slides.map((s) => `${slug}-${s.type}`)

  return (
    <div className="flex min-h-svh flex-col items-center gap-8 bg-background py-16">
      <div className="flex flex-col items-center gap-1">
        <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          {slug}
        </p>
        <h1 className="text-sm font-medium text-foreground">{carousel.title}</h1>
      </div>

      <div className="flex flex-col gap-6">
        {slides.map((slide: Slide, i: number) => (
          <SlideItem
            key={i}
            slide={slide}
            format={format}
            index={i}
            total={total}
            slideRef={slideRefs[i]}
            width={width}
            height={height}
            scale={SCALE}
            filename={filenames[i]}
            allRefs={slideRefs}
            allFilenames={filenames}
          />
        ))}
      </div>

      <SlideExportControls allRefs={slideRefs} allFilenames={filenames} />
    </div>
  )
}
