import {
  SlideFormat,
  type CoverSlide as CoverSlideData,
} from "@/features/slides/types"
import { AccentBar } from "@/shared/components/AccentBar"
import { BgShape } from "@/shared/components/BgShape"
import { Overline } from "@/shared/components/Overline"
import { Pagination } from "@/shared/components/Pagination"
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
  currentSlide,
  totalSlides,
}: CoverSlideProps) {
  const headlineSize =
    format === "vertical" ? "var(--text-display)" : "var(--text-h1)"

  return (
    <SlideCanvas format={format}>
      <BgShape position="top-right" color="orange" size={600} />
      <BgShape position="bottom-left" color="cyan" size={300} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: `var(--space-20) var(--space-16)`,
          paddingBottom: "var(--space-16)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          gap: "var(--space-6)",
        }}
      >
        {/* Top content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-6)",
            flex: 1,
            justifyContent: "center",
          }}
        >
          {overline && <Overline>{overline}</Overline>}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-6)",
            }}
          >
            <h1
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: headlineSize,
                fontWeight: 700,
                lineHeight: 1.1,
                margin: 0,
                color: "var(--text-primary)",
              }}
              dangerouslySetInnerHTML={{
                __html: highlightWords(headline, words),
              }}
            />
            <AccentBar />
          </div>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-body)",
              lineHeight: 1.6,
              color: "var(--text-secondary)",
              margin: 0,
              maxWidth: "80%",
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* Bottom: tags + pagination */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-4)",
          }}
        >
          {tags && tags.length > 0 && (
            <div
              style={{
                display: "flex",
                gap: "var(--space-3)",
                flexWrap: "wrap",
              }}
            >
              {tags.map((tag, i) => (
                <Tag key={tag} variant={i === 0 ? "primary" : "secondary"}>
                  {tag}
                </Tag>
              ))}
            </div>
          )}
        </div>
      </div>

      <Pagination current={currentSlide} total={totalSlides} />
    </SlideCanvas>
  )
}
