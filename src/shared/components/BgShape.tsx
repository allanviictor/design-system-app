interface BgShapeProps {
  position?: "top-right" | "bottom-left" | "top-left" | "bottom-right";
  color?: "orange" | "cyan";
  size?: number;
}

export function BgShape({
  position = "top-right",
  color = "orange",
  size = 500,
}: BgShapeProps) {
  const colorValue =
    color === "orange"
      ? "rgba(255, 107, 0, 0.12)"
      : "rgba(0, 240, 224, 0.06)";

  const posStyle: React.CSSProperties = {
    "top-right": { top: -size / 3, right: -size / 3 },
    "bottom-left": { bottom: -size / 3, left: -size / 3 },
    "top-left": { top: -size / 3, left: -size / 3 },
    "bottom-right": { bottom: -size / 3, right: -size / 3 },
  }[position];

  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(ellipse at center, ${colorValue} 0%, transparent 70%)`,
        filter: "blur(60px)",
        opacity: 0.6,
        pointerEvents: "none",
        ...posStyle,
      }}
    />
  );
}
