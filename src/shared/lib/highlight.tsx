/**
 * Wraps matched words in a headline with an orange accent span.
 * Returns an HTML string safe for dangerouslySetInnerHTML.
 */
export function highlightWords(
  text: string,
  words?: string[]
): string {
  if (!words?.length) return escapeHtml(text);

  const escaped = words.map(escapeRegex).join("|");
  const regex = new RegExp(`(${escaped})`, "gi");

  return text
    .split(regex)
    .map((part) => {
      const isMatch = words.some(
        (w) => w.toLowerCase() === part.toLowerCase()
      );
      return isMatch
        ? `<span style="color:var(--accent-primary)">${escapeHtml(part)}</span>`
        : escapeHtml(part);
    })
    .join("");
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
