interface AccentBarProps {
  align?: "left" | "center";
}

export function AccentBar({ align = "left" }: AccentBarProps) {
  return (
    <div
      style={{
        width: 48,
        height: 4,
        background: "var(--gradient-accent)",
        borderRadius: 2,
        margin: align === "center" ? "0 auto" : undefined,
      }}
    />
  );
}
