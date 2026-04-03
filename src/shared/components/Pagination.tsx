interface PaginationProps {
  current: number
  total: number
}

export function Pagination({ current, total }: PaginationProps) {
  const pad = (n: number) => String(n).padStart(2, "0")

  return (
    <span
      style={{
        fontFamily: "var(--font-code)",
        fontSize: "var(--text-caption)",
        color: "var(--text-muted)",
        position: "absolute",
        bottom: "var(--space-8)",
        right: "var(--space-16)",
      }}
    >
      {pad(current)} / {pad(total)}
    </span>
  )
}
