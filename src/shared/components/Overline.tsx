interface OverlineProps {
  children: React.ReactNode;
}

export function Overline({ children }: OverlineProps) {
  return (
    <p
      style={{
        fontFamily: "var(--font-code)",
        fontSize: "var(--text-overline)",
        color: "var(--text-muted)",
        textTransform: "uppercase",
        letterSpacing: "0.15em",
        fontWeight: 600,
        margin: 0,
      }}
    >
      {children}
    </p>
  );
}
