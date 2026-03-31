import { SlideCanvas } from "../canvas/SlideCanvas";
import { AccentBar } from "@/shared/components/AccentBar";
import { BgShape } from "@/shared/components/BgShape";
import { CodeBlock } from "@/shared/components/CodeBlock";
import { Overline } from "@/shared/components/Overline";
import { Pagination } from "@/shared/components/Pagination";
import { SlideFooter } from "@/shared/components/SlideFooter";
import type {
  ComparisonSlide as ComparisonSlideData,
  ComparisonCard,
  SlideFormat,
} from "@/features/slides/types";
import { highlightWords } from "@/shared/lib/highlight";

const variantBorderColor: Record<ComparisonCard["variant"], string> = {
  success: "var(--color-success)",
  error: "var(--color-error)",
  warning: "var(--color-warning)",
  neutral: "var(--border-subtle)",
};

const variantLabelColor: Record<ComparisonCard["variant"], string> = {
  success: "var(--color-success)",
  error: "var(--color-error)",
  warning: "var(--color-warning)",
  neutral: "var(--text-muted)",
};

function CompCard({ card }: { card: ComparisonCard }) {
  return (
    <div
      style={{
        flex: 1,
        backgroundColor: "var(--bg-secondary)",
        border: "1px solid var(--border-subtle)",
        borderTop: `3px solid ${variantBorderColor[card.variant]}`,
        borderRadius: "var(--radius-lg)",
        padding: "var(--space-8)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-4)",
      }}
    >
      <h3
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "var(--text-h3)",
          fontWeight: 600,
          lineHeight: 1.3,
          margin: 0,
          color: "var(--text-primary)",
        }}
      >
        {card.title}
      </h3>

      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "var(--text-body-sm)",
          lineHeight: 1.5,
          color: "var(--text-secondary)",
          margin: 0,
          flex: 1,
        }}
      >
        {card.body}
      </p>

      {card.code && (
        <CodeBlock
          code={card.code}
          language={card.language ?? "typescript"}
          showLineNumbers={false}
          maxLines={6}
        />
      )}

      {card.label && (
        <span
          style={{
            fontFamily: "var(--font-code)",
            fontSize: "var(--text-caption)",
            color: variantLabelColor[card.variant],
            marginTop: "auto",
          }}
        >
          {card.label}
        </span>
      )}
    </div>
  );
}

interface ComparisonSlideProps extends ComparisonSlideData {
  format?: SlideFormat;
  currentSlide: number;
  totalSlides: number;
}

export function ComparisonSlide({
  format = "square",
  overline,
  headline,
  highlightWords: words,
  left,
  right,
  conclusion,
  currentSlide,
  totalSlides,
}: ComparisonSlideProps) {
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

        <div style={{ display: "flex", gap: "var(--space-6)", flex: 1, alignItems: "stretch" }}>
          <CompCard card={left} />
          <CompCard card={right} />
        </div>

        {conclusion && (
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-body-sm)",
              lineHeight: 1.5,
              color: "var(--text-secondary)",
              margin: 0,
            }}
          >
            {conclusion}
          </p>
        )}
      </div>

      <SlideFooter />
      <Pagination current={currentSlide} total={totalSlides} />
    </SlideCanvas>
  );
}
