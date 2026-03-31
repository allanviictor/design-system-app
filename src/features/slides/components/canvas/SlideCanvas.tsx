import { cn } from "@/lib/utils";
import type { SlideFormat } from "@/features/slides/types";

const DIMENSIONS = {
  vertical: { width: 1080, height: 1350 },
  square: { width: 1080, height: 1080 },
};

interface SlideCanvasProps {
  format?: SlideFormat;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function SlideCanvas({
  format = "square",
  children,
  className,
  id,
}: SlideCanvasProps) {
  const { width, height } = DIMENSIONS[format];

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      id={id}
      style={{
        width,
        height,
        backgroundColor: "var(--bg-primary)",
        fontFamily: "var(--font-body)",
        color: "var(--text-primary)",
      }}
    >
      {children}
    </div>
  );
}
