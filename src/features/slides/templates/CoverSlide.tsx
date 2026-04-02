import {
  SlideFormat,
  type CoverSlide as CoverSlideData,
} from "@/features/slides/types"
import { AccentBar } from "@/shared/components/AccentBar"
import { Overline } from "@/shared/components/Overline"
import { SlideFooter } from "@/shared/components/SlideFooter"
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
  authorPhoto,
  currentSlide,
  totalSlides,
}: CoverSlideProps) {
  const isVertical = format === SlideFormat.Vertical

  const headlineSize = isVertical ? "84px" : "72px"
  const contentPadding = isVertical ? "96px 80px" : "80px 72px"
  const subtitleSize = isVertical ? "22px" : "20px"
  const footerBottom = isVertical ? "64px" : "48px"
  const footerLeft = isVertical ? "80px" : "72px"

  return (
    <SlideCanvas format={format}>
      {/* Foto — direita, 52% */}
      {authorPhoto && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "52%",
            height: "100%",
            overflow: "hidden",
            zIndex: 1,
          }}
        >
          <img
            src={authorPhoto}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
              display: "block",
            }}
          />
        </div>
      )}

      {/* Fade — dissolução suave foto → bg */}
      {authorPhoto && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "52%",
            height: "100%",
            background:
              "linear-gradient(to right, var(--bg-primary) 0%, rgba(250,248,243,0.90) 15%, rgba(250,248,243,0.75) 30%, rgba(250,248,243,0.50) 45%, rgba(250,248,243,0.25) 60%, rgba(250,248,243,0.12) 75%, rgba(250,248,243,0.06) 85%, transparent 100%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Conteúdo — esquerda, 68% */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "68%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: contentPadding,
          zIndex: 3,
        }}
      >
        {overline && <Overline className="mb-7">{overline}</Overline>}

        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: headlineSize,
            fontWeight: 700,
            lineHeight: 1.05,
            margin: 0,
            marginBottom: "24px",
            color: "var(--text-primary)",
          }}
          dangerouslySetInnerHTML={{
            __html: highlightWords(headline, words),
          }}
        />

        <AccentBar className="mb-7" />

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: subtitleSize,
            fontWeight: 400,
            lineHeight: 1.6,
            color: "var(--text-secondary)",
            margin: 0,
            marginBottom: "36px",
            maxWidth: "480px",
          }}
        >
          {subtitle}
        </p>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2.5">
            {tags.map((tag, i) => (
              <Tag key={tag} variant={i === 0 ? "orange" : "neutral"}>
                {tag}
              </Tag>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <SlideFooter
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        style={{
          bottom: footerBottom,
          left: footerLeft,
        }}
      />
    </SlideCanvas>
  )
}
