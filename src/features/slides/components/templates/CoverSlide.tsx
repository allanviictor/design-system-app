import {
  SlideFormat,
  type CoverSlide as CoverSlideData,
} from "@/features/slides/types"
import { BgShape } from "@/shared/components/BgShape"
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

      {/* BG Layer 1: decorative grid */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: [
            "repeating-linear-gradient(rgba(255,85,0,0.04) 0px, rgba(255,85,0,0.04) 1px, transparent 1px, transparent 40px)",
            "repeating-linear-gradient(90deg, rgba(255,85,0,0.04) 0px, rgba(255,85,0,0.04) 1px, transparent 1px, transparent 40px)",
          ].join(", "),
        }}
      />

      {/* BG Layer 2: grain overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          filter: "url(#grain)",
          opacity: 0.07,
          pointerEvents: "none",
        }}
      />

      {/* BG Layer 3+4: glow blobs */}
      <BgShape position="bottom-left" color="orange" size={600} />
      <BgShape position="top-right" color="cyan" size={400} />

      {/* Main layout: full-canvas flex row */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
        }}
      >
        {/* ── LEFT COLUMN ── */}
        <div
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            padding: "8% 7%",
          }}
        >
          {/* Content area — centered vertically */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "var(--space-6)",
            }}
          >
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
                    width: 2,
                    height: 16,
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
                    letterSpacing: "0.25em",
                    fontWeight: 600,
                  }}
                >
                  {overline}
                </span>
              </div>
            )}

            {/* Headline + accent bar */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-4)",
              }}
            >
              <h1
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: headlineSize,
                  fontWeight: 900,
                  lineHeight: 1.1,
                  margin: 0,
                  color: "var(--text-primary)",
                }}
                dangerouslySetInnerHTML={{
                  __html: highlightWords(headline, words),
                }}
              />
              <div
                style={{
                  width: 54,
                  height: 3,
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
                color: "var(--text-secondary)",
                margin: 0,
                maxWidth: "90%",
              }}
            >
              {subtitle}
            </p>

            {/* Tags */}
            {tags && tags.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {tags.map((tag, i) => (
                  <Tag key={tag} variant={i === 0 ? "primary" : "secondary"}>
                    {tag}
                  </Tag>
                ))}
              </div>
            )}
          </div>

          {/* Bottom row: footer + pagination */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-code)",
                fontSize: "var(--text-caption)",
                color: "var(--text-muted)",
              }}
            >
              allan victor
            </span>
            <span
              style={{
                fontFamily: "var(--font-code)",
                fontSize: "var(--text-caption)",
                color: "var(--text-muted)",
              }}
            >
              {pad(currentSlide)} / {pad(totalSlides)}
            </span>
          </div>
        </div>

        {/* ── CENTER DIVIDER ── */}
        <div
          aria-hidden="true"
          style={{
            width: 1,
            alignSelf: "center",
            height: "84%",
            background:
              "linear-gradient(to bottom, transparent, rgba(255,85,0,0.3), rgba(0,229,200,0.2), transparent)",
            flexShrink: 0,
          }}
        />

        {/* ── RIGHT COLUMN ── */}
        <div
          style={{
            flex: 1,
            position: "relative",
            overflow: "hidden",
            backgroundColor: "var(--secondary-900)",
          }}
        >
          {authorPhoto ? (
            <>
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
              {/* Left vignette */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to right, rgba(8,8,8,0.5) 0%, transparent 30%)",
                  pointerEvents: "none",
                }}
              />
              {/* Bottom vignette */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(8,8,8,0.7) 0%, transparent 25%)",
                  pointerEvents: "none",
                }}
              />
              {/* Cyan glow top-right */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(ellipse at top right, rgba(0,229,200,0.08) 0%, transparent 60%)",
                  pointerEvents: "none",
                }}
              />
            </>
          ) : (
            /* Placeholder */
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 80,
                  height: 80,
                  border: "2px dashed rgba(240,237,232,0.15)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(240,237,232,0.3)"
                  strokeWidth="1.5"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-code)",
                  fontSize: "var(--text-caption)",
                  color: "var(--text-muted)",
                  letterSpacing: "0.1em",
                }}
              >
                SUA FOTO
              </span>
            </div>
          )}
        </div>
      </div>
    </SlideCanvas>
  )
}
