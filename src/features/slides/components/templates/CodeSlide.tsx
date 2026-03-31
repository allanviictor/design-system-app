import { SlideCanvas } from "../canvas/SlideCanvas";
import { AccentBar } from "@/shared/components/AccentBar";
import { BgShape } from "@/shared/components/BgShape";
import { CodeBlock } from "@/shared/components/CodeBlock";
import { Overline } from "@/shared/components/Overline";
import { Pagination } from "@/shared/components/Pagination";
import { SlideFooter } from "@/shared/components/SlideFooter";
import type { CodeSlide as CodeSlideData, SlideFormat } from "@/features/slides/types";
import { highlightWords } from "@/shared/lib/highlight";

interface CodeSlideProps extends CodeSlideData {
  format?: SlideFormat;
  currentSlide: number;
  totalSlides: number;
}

export function CodeSlide({
  format = "square",
  overline,
  headline,
  highlightWords: words,
  code,
  language,
  highlightLines,
  showLineNumbers = true,
  caption,
  currentSlide,
  totalSlides,
}: CodeSlideProps) {
  const maxLines = format === "vertical" ? 15 : 10;

  return (
    <SlideCanvas format={format}>
      <BgShape position="top-right" color="orange" size={350} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: `var(--space-16) var(--space-16)`,
          paddingBottom: "calc(var(--space-16) + 48px)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-6)",
          justifyContent: "center",
        }}
      >
        {overline && <Overline>{overline}</Overline>}

        {headline && (
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "var(--text-h2)",
                fontWeight: 700,
                lineHeight: 1.2,
                margin: 0,
                color: "var(--text-primary)",
              }}
              dangerouslySetInnerHTML={{
                __html: highlightWords(headline, words),
              }}
            />
            <AccentBar />
          </div>
        )}

        <CodeBlock
          code={code}
          language={language}
          highlightLines={highlightLines}
          showLineNumbers={showLineNumbers}
          maxLines={maxLines}
        />

        {caption && (
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-body-sm)",
              lineHeight: 1.5,
              color: "var(--text-secondary)",
              margin: 0,
            }}
          >
            {caption}
          </p>
        )}
      </div>

      <SlideFooter />
      <Pagination current={currentSlide} total={totalSlides} />
    </SlideCanvas>
  );
}
