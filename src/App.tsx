import { useCallback, useEffect, useState } from "react";
import { CoverSlide } from "@/features/slides/components/templates/CoverSlide";
import { ContentSlide } from "@/features/slides/components/templates/ContentSlide";
import { CodeSlide } from "@/features/slides/components/templates/CodeSlide";
import { ComparisonSlide } from "@/features/slides/components/templates/ComparisonSlide";
import { ClosingSlide } from "@/features/slides/components/templates/ClosingSlide";
import type { Slide, SlideFormat } from "@/features/slides/types";
import { pilotoTestes } from "@/posts/piloto-testes";

const SCALE = 0.5;

const DIMENSIONS = {
  vertical: { width: 1080, height: 1350 },
  square: { width: 1080, height: 1080 },
};

function renderSlide(
  slide: Slide,
  format: SlideFormat,
  currentSlide: number,
  totalSlides: number
) {
  const base = { format, currentSlide, totalSlides };
  switch (slide.type) {
    case "cover":
      return <CoverSlide {...slide} {...base} />;
    case "content":
      return <ContentSlide {...slide} {...base} />;
    case "code":
      return <CodeSlide {...slide} {...base} />;
    case "comparison":
      return <ComparisonSlide {...slide} {...base} />;
    case "closing":
      return <ClosingSlide {...slide} {...base} />;
  }
}

export default function App() {
  const { slides, format } = pilotoTestes;
  const [index, setIndex] = useState(0);
  const total = slides.length;
  const { width, height } = DIMENSIONS[format];

  const prev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);
  const next = useCallback(
    () => setIndex((i) => Math.min(total - 1, i + 1)),
    [total]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  const slide = slides[index];

  return (
    <div className="min-h-svh bg-background flex flex-col items-center justify-center gap-8 p-8">
      <div className="flex flex-col items-center gap-1">
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
          piloto-testes
        </p>
        <h1 className="text-sm font-medium text-foreground">
          {pilotoTestes.title}
        </h1>
      </div>

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
          style={{
            width,
            height,
            transform: `scale(${SCALE})`,
            transformOrigin: "top left",
          }}
        >
          {renderSlide(slide, format, index + 1, total)}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={prev}
          disabled={index === 0}
          className="px-4 py-2 rounded-md border border-border text-sm text-foreground disabled:opacity-30 hover:bg-accent transition-colors font-mono"
        >
          ← anterior
        </button>

        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              style={{
                width: i === index ? 20 : 6,
                height: 6,
                borderRadius: 3,
                background:
                  i === index
                    ? "var(--accent-primary)"
                    : "rgba(255,255,255,0.15)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s",
                padding: 0,
              }}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={index === total - 1}
          className="px-4 py-2 rounded-md border border-border text-sm text-foreground disabled:opacity-30 hover:bg-accent transition-colors font-mono"
        >
          próximo →
        </button>
      </div>

      <p className="text-xs text-muted-foreground font-mono">
        ← → para navegar · {String(index + 1).padStart(2, "0")} de{" "}
        {String(total).padStart(2, "0")}
      </p>
    </div>
  );
}
