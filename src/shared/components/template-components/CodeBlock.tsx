import { getHighlighter, highlight } from "@/lib/shiki"
import { useEffect, useState } from "react"

interface CodeBlockProps {
  code: string
  language: string
  highlightLines?: number[]
  showLineNumbers?: boolean
  maxLines?: number
}

export function CodeBlock({
  code,
  language,
  highlightLines = [],
  showLineNumbers = true,
  maxLines,
}: CodeBlockProps) {
  const [html, setHtml] = useState<string>("")

  const displayCode = maxLines
    ? code.split("\n").slice(0, maxLines).join("\n")
    : code
  const wasTruncated = maxLines ? code.split("\n").length > maxLines : false

  useEffect(() => {
    getHighlighter().then((h) => {
      const result = highlight(h, displayCode, language, highlightLines)
      setHtml(result)
    })
  }, [displayCode, language, highlightLines])

  return (
    <div
      style={{
        backgroundColor: "var(--bg-code)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-xl)",
        overflow: "hidden",
        position: "relative",
        boxShadow: "var(--shadow-code)",
      }}
    >
      {/* Language badge */}
      <div
        style={{
          position: "absolute",
          top: 12,
          right: 14,
          fontFamily: "var(--font-code)",
          fontSize: "var(--text-caption)",
          color: "var(--text-muted)",
          zIndex: 1,
        }}
      >
        {language}
      </div>

      {/* Code */}
      <div
        style={{
          padding: "var(--space-8)",
          paddingRight: "calc(var(--space-8) + 60px)",
          fontFamily: "var(--font-code)",
          fontSize: "var(--text-code)",
          lineHeight: 1.6,
          overflowX: "hidden",
          display: "flex",
          gap: showLineNumbers ? "var(--space-4)" : 0,
        }}
      >
        {/* Line numbers */}
        {showLineNumbers && (
          <div
            style={{
              color: "var(--text-muted)",
              userSelect: "none",
              textAlign: "right",
              flexShrink: 0,
              borderRight: "1px solid var(--border-subtle)",
              paddingRight: "var(--space-4)",
              lineHeight: 1.6,
            }}
          >
            {displayCode.split("\n").map((_, i) => (
              <div key={i}>{String(i + 1).padStart(2, "0")}</div>
            ))}
            {wasTruncated && <div style={{ opacity: 0.4 }}>…</div>}
          </div>
        )}

        {/* Highlighted code */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {html ? (
            <div
              dangerouslySetInnerHTML={{ __html: html }}
              style={{ lineHeight: 1.6 }}
            />
          ) : (
            <pre
              style={{
                margin: 0,
                color: "var(--text-primary)",
                lineHeight: 1.6,
              }}
            >
              {displayCode}
            </pre>
          )}
          {wasTruncated && (
            <div
              style={{
                color: "var(--text-muted)",
                fontFamily: "var(--font-code)",
                fontSize: "var(--text-caption)",
                marginTop: "var(--space-2)",
              }}
            >
              // ...
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
