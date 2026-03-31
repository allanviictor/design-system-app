import { SlideCanvas } from "../canvas/SlideCanvas";
import { AccentBar } from "@/shared/components/AccentBar";
import { BgShape } from "@/shared/components/BgShape";
import { Pagination } from "@/shared/components/Pagination";
import type { ClosingSlide as ClosingSlideData, SlideFormat } from "@/features/slides/types";

interface ClosingSlideProps extends ClosingSlideData {
  format?: SlideFormat;
  currentSlide: number;
  totalSlides: number;
}

export function ClosingSlide({
  format = "square",
  authorName = "Allan Victor",
  cta,
  handle,
  actions = ["Curta", "Comente", "Salve"],
  currentSlide,
  totalSlides,
}: ClosingSlideProps) {
  return (
    <SlideCanvas format={format}>
      <BgShape position="top-right" color="orange" size={500} />
      <BgShape position="bottom-left" color="cyan" size={350} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "var(--space-6)",
          padding: "var(--space-16)",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "var(--text-h2)",
            fontWeight: 600,
            lineHeight: 1.2,
            margin: 0,
            color: "var(--text-primary)",
          }}
        >
          {authorName}
        </h2>

        <AccentBar align="center" />

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-body)",
            lineHeight: 1.6,
            color: "var(--text-secondary)",
            margin: 0,
            maxWidth: 600,
          }}
        >
          {cta}
        </p>

        {actions.length > 0 && (
          <p
            style={{
              fontFamily: "var(--font-code)",
              fontSize: "var(--text-caption)",
              color: "var(--text-muted)",
              margin: 0,
            }}
          >
            {actions.join(" · ")}
          </p>
        )}

        {handle && (
          <p
            style={{
              fontFamily: "var(--font-code)",
              fontSize: "var(--text-caption)",
              color: "var(--accent-primary)",
              margin: 0,
            }}
          >
            {handle}
          </p>
        )}
      </div>

      <Pagination current={currentSlide} total={totalSlides} />
    </SlideCanvas>
  );
}
