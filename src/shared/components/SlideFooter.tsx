interface SlideFooterProps {
  author?: string;
  handle?: string;
}

export function SlideFooter({
  author = "allan victor",
  handle,
}: SlideFooterProps) {
  return (
    <span
      style={{
        fontFamily: "var(--font-code)",
        fontSize: "var(--text-caption)",
        color: "var(--text-muted)",
        position: "absolute",
        bottom: "var(--space-8)",
        left: "var(--space-16)",
      }}
    >
      {author}
      {handle && <> · {handle}</>}
    </span>
  );
}
