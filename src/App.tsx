import { createRef, useMemo, useRef } from "react"
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
  totalSlides: number
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
  const filenames = useMemo(
    () => slides.map((s) => `${slug}-${s.type}`),
    [slides, slug]
  )

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
              className="relative overflow-hidden rounded-lg shadow-2xl"
              style={{
                width: width * SCALE,
                height: height * SCALE,
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
