import { createHighlighter, type Highlighter } from "shiki"
import { avmDarkTheme } from "./avm-theme"

let highlighter: Highlighter | null = null

export async function getHighlighter(): Promise<Highlighter> {
  if (highlighter) return highlighter

  highlighter = await createHighlighter({
    themes: [avmDarkTheme],
    langs: [
      "javascript",
      "typescript",
      "tsx",
      "jsx",
      "html",
      "css",
      "json",
      "bash",
      "python",
    ],
  })

  return highlighter
}

export function highlight(
  highlighterInstance: Highlighter,
  code: string,
  language: string,
  highlightLines?: number[]
): string {
  return highlighterInstance.codeToHtml(code, {
    lang: language,
    theme: "avm-dark",
    transformers: highlightLines?.length
      ? [
          {
            line(node, line) {
              if (highlightLines.includes(line)) {
                node.properties["data-highlighted"] = "true"
              }
            },
          },
        ]
      : undefined,
  })
}
