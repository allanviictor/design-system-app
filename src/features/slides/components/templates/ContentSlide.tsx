import { SlideCanvas } from "../canvas/SlideCanvas";
import { AccentBar } from "@/shared/components/AccentBar";
import { BgShape } from "@/shared/components/BgShape";
import { Overline } from "@/shared/components/Overline";
import { Pagination } from "@/shared/components/Pagination";
import { SlideFooter } from "@/shared/components/SlideFooter";
import type { ContentSlide as ContentSlideData, SlideFormat } from "@/features/slides/types";
import { highlightWords } from "@/shared/lib/highlight";

interface ContentSlideProps extends ContentSlideData {
  format?: SlideFormat;
  currentSlide: number;
  totalSlides: number;
}

export function ContentSlide({
  format = "square",
  overline,
  headline,
  highlightWords: words,
  body,
  footnote,
  currentSlide,
  totalSlides,
}: ContentSlideProps) {
  const paragraphs = Array.isArray(body) ? body : [body];

  return (
    <SlideCanvas format={format}>
      <BgShape position="top-right" color="orange" size={400} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: `var(--space-20) var(--space-16)`,
          paddingBottom: "calc(var(--space-16) + 48px)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-6)",
          justifyContent: "center",
        }}
      >
        {overline && <Overline>{overline}</Overline>}

        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "var(--text-h1)",
              fontWeight: 700,
              lineHeight: 1.15,
              margin: 0,
              color: "var(--text-primary)",
            }}
            dangerouslySetInnerHTML={{
              __html: highlightWords(headline, words),
            }}
          />
          <AccentBar />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
          {paragraphs.map((p, i) => (
            <p
              key={i}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-body)",
                lineHeight: 1.6,
                color: "var(--text-primary)",
                margin: 0,
              }}
            >
              {p}
            </p>
          ))}
        </div>

        {footnote && (
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-body-sm)",
              lineHeight: 1.5,
              color: "var(--text-secondary)",
              margin: 0,
              borderLeft: "2px solid var(--border-accent)",
              paddingLeft: "var(--space-4)",
            }}
          >
            {footnote}
          </p>
        )}
      </div>

      <SlideFooter />
      <Pagination current={currentSlide} total={totalSlides} />
    </SlideCanvas>
  );
}
