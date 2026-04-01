import {
  SlideFormat,
  type CoverSlide as CoverSlideData,
} from "@/features/slides/types"
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
  const pad = (n: number) => String(n).padStart(2, "0")
  const headlineSize =
    format === "vertical" ? "var(--text-display)" : "var(--text-h1)"

  return (
    <SlideCanvas format={format}>
      {/* Grain SVG filter — hidden, referenced by filter: url(#grain) */}
      <svg style={{ display: "none" }} aria-hidden="true">
        <defs>
          <filter id="grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
      </svg>

      {/* === FULLSCREEN BACKGROUND PHOTO === */}
      {authorPhoto && (
        <>
          <img
            src={authorPhoto}
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
              zIndex: 0,
            }}
          />

          {/* Warm toning overlay — orange gradient from right */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to left, rgba(255,85,0,0.25) 0%, rgba(255,85,0,0.1) 30%, transparent 60%)",
              zIndex: 1,
              pointerEvents: "none",
            }}
          />

          {/* Dark vignette — darker bottom + left */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at top right, transparent 0%, rgba(8,8,8,0.4) 60%, rgba(8,8,8,0.7) 100%)",
              zIndex: 2,
              pointerEvents: "none",
            }}
          />

          {/* Grain overlay on photo */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              filter: "url(#grain)",
              opacity: 0.05,
              zIndex: 3,
              pointerEvents: "none",
            }}
          />
        </>
      )}

      {/* === CONTENT OVERLAY — Positioned left-bottom === */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          padding: "var(--space-20) var(--space-16)",
          paddingRight: "55%",
        }}
      >
        {/* Content container — max width to prevent overlap with placeholder on right */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
          {/* Overline — bar + text */}
          {overline && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  width: 3,
                  height: 18,
                  background: "var(--primary-500)",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-code)",
                  fontSize: "var(--text-overline)",
                  color: "var(--primary-400)",
                  textTransform: "uppercase",
                  letterSpacing: "0.3em",
                  fontWeight: 600,
                }}
              >
                {overline}
              </span>
            </div>
          )}

          {/* Headline + accent bar — with shadow for legibility over photo */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
            <h1
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: headlineSize,
                fontWeight: 900,
                lineHeight: 1.1,
                margin: 0,
                color: "var(--text-primary)",
                textShadow: "0 4px 12px rgba(8,8,8,0.8)",
                maxWidth: "95%",
              }}
              dangerouslySetInnerHTML={{
                __html: highlightWords(headline, words),
              }}
            />
            <div
              style={{
                width: 64,
                height: 4,
                background: "var(--gradient-accent)",
                borderRadius: 2,
                boxShadow: "0 2px 8px rgba(255,85,0,0.3)",
              }}
            />
          </div>

          {/* Subtitle — with shadow for legibility */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-body-sm)",
              lineHeight: 1.6,
              color: "var(--text-primary)",
              margin: 0,
              maxWidth: "85%",
              textShadow: "0 2px 8px rgba(8,8,8,0.7)",
            }}
          >
            {subtitle}
          </p>

          {/* Tags — with background for visibility over photo */}
          {tags && tags.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: "var(--space-4)" }}>
              {tags.map((tag, i) => (
                <Tag key={tag} variant={i === 0 ? "primary" : "secondary"}>
                  {tag}
                </Tag>
              ))}
            </div>
          )}
        </div>

        {/* Bottom info bar — footer + pagination */}
        <div
          style={{
            position: "absolute",
            bottom: "var(--space-16)",
            left: "var(--space-16)",
            display: "flex",
            gap: "var(--space-12)",
            alignItems: "center",
            paddingRight: "var(--space-16)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-code)",
              fontSize: "var(--text-caption)",
              color: "var(--text-primary)",
              fontWeight: 500,
              textShadow: "0 1px 4px rgba(8,8,8,0.8)",
            }}
          >
            allan victor
          </span>
          <div
            style={{
              width: 1,
              height: 16,
              background: "rgba(255,85,0,0.3)",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-code)",
              fontSize: "var(--text-caption)",
              color: "var(--text-primary)",
              fontWeight: 500,
              textShadow: "0 1px 4px rgba(8,8,8,0.8)",
            }}
          >
            {pad(currentSlide)} / {pad(totalSlides)}
          </span>
        </div>
      </div>

      {/* === PLACEHOLDER (no photo) === */}
      {!authorPhoto && (
        <>
          {/* Dark gradient background */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, rgba(10,32,32,0.9) 0%, rgba(8,8,8,0.8) 100%)",
              zIndex: 0,
            }}
          />

          {/* Decorative grid pattern */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: [
                "repeating-linear-gradient(rgba(255,85,0,0.08) 0px, rgba(255,85,0,0.08) 1px, transparent 1px, transparent 60px)",
                "repeating-linear-gradient(90deg, rgba(255,85,0,0.08) 0px, rgba(255,85,0,0.08) 1px, transparent 1px, transparent 60px)",
              ].join(", "),
              zIndex: 1,
              pointerEvents: "none",
            }}
          />

          {/* Glow blobs placeholder background */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: "-20%",
              left: "-15%",
              width: "400px",
              height: "400px",
              background:
                "radial-gradient(ellipse, rgba(255,85,0,0.15) 0%, transparent 70%)",
              borderRadius: "50%",
              filter: "blur(80px)",
              zIndex: 1,
              pointerEvents: "none",
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-10%",
              right: "-10%",
              width: "300px",
              height: "300px",
              background:
                "radial-gradient(ellipse, rgba(0,229,200,0.1) 0%, transparent 70%)",
              borderRadius: "50%",
              filter: "blur(60px)",
              zIndex: 1,
              pointerEvents: "none",
            }}
          />

          {/* Grain on placeholder */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              filter: "url(#grain)",
              opacity: 0.07,
              zIndex: 2,
              pointerEvents: "none",
            }}
          />

          {/* Content overlay on placeholder */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "flex-start",
              padding: "var(--space-20) var(--space-16)",
              paddingRight: "55%",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
              {/* Overline */}
              {overline && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <div
                    style={{
                      width: 3,
                      height: 18,
                      background: "var(--primary-500)",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-code)",
                      fontSize: "var(--text-overline)",
                      color: "var(--primary-400)",
                      textTransform: "uppercase",
                      letterSpacing: "0.3em",
                      fontWeight: 600,
                    }}
                  >
                    {overline}
                  </span>
                </div>
              )}

              {/* Headline */}
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
                <h1
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: headlineSize,
                    fontWeight: 900,
                    lineHeight: 1.1,
                    margin: 0,
                    color: "var(--text-primary)",
                    maxWidth: "95%",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: highlightWords(headline, words),
                  }}
                />
                <div
                  style={{
                    width: 64,
                    height: 4,
                    background: "var(--gradient-accent)",
                    borderRadius: 2,
                  }}
                />
              </div>

              {/* Subtitle */}
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-body-sm)",
                  lineHeight: 1.6,
                  color: "var(--text-primary)",
                  margin: 0,
                  maxWidth: "85%",
                }}
              >
                {subtitle}
              </p>

              {/* Tags */}
              {tags && tags.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: "var(--space-4)" }}>
                  {tags.map((tag, i) => (
                    <Tag key={tag} variant={i === 0 ? "primary" : "secondary"}>
                      {tag}
                    </Tag>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom info */}
            <div
              style={{
                position: "absolute",
                bottom: "var(--space-16)",
                left: "var(--space-16)",
                display: "flex",
                gap: "var(--space-12)",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-code)",
                  fontSize: "var(--text-caption)",
                  color: "var(--text-primary)",
                  fontWeight: 500,
                }}
              >
                allan victor
              </span>
              <div
                style={{
                  width: 1,
                  height: 16,
                  background: "rgba(255,85,0,0.3)",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-code)",
                  fontSize: "var(--text-caption)",
                  color: "var(--text-primary)",
                  fontWeight: 500,
                }}
              >
                {pad(currentSlide)} / {pad(totalSlides)}
              </span>
            </div>
          </div>
        </>
      )}
    </SlideCanvas>
  )
}
