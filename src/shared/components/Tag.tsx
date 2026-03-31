interface TagProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

const styles: Record<"primary" | "secondary", React.CSSProperties> = {
  primary: {
    background: "rgba(255, 107, 0, 0.12)",
    border: "1px solid rgba(255, 107, 0, 0.25)",
    color: "var(--accent-light)",
  },
  secondary: {
    background: "rgba(0, 240, 224, 0.06)",
    border: "1px solid rgba(0, 240, 224, 0.12)",
    color: "var(--cyan-muted)",
  },
};

export function Tag({ children, variant = "primary" }: TagProps) {
  return (
    <span
      style={{
        ...styles[variant],
        fontFamily: "var(--font-code)",
        fontSize: "var(--text-caption)",
        padding: "var(--space-1) var(--space-3)",
        borderRadius: "var(--radius-sm)",
        textTransform: "lowercase",
        display: "inline-block",
      }}
    >
      {children}
    </span>
  );
}
