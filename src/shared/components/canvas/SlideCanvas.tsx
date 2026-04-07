import { cn } from "@/lib/utils"
import { SlideFormat, SLIDE_DIMENSIONS } from "@/shared/enums/slide-format"

interface SlideCanvasProps {
  format?: SlideFormat
  children: React.ReactNode
  className?: string
  id?: string
}

export function SlideCanvas({
  format = SlideFormat.Square,
  children,
  className,
  id,
}: SlideCanvasProps) {
  const { width, height } = SLIDE_DIMENSIONS[format]

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
  )
}
