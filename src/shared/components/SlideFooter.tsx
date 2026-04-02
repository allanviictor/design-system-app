import { cn } from "@/lib/utils"

interface SlideFooterProps {
  author?: string
  currentSlide: number
  totalSlides: number
  className?: string
  style?: React.CSSProperties
}

export function SlideFooter({
  author = "allan victor",
  currentSlide,
  totalSlides,
  className,
  style,
}: SlideFooterProps) {
  const pad = (n: number) => String(n).padStart(2, "0")

  return (
    <div
      className={cn(
        "absolute flex items-center gap-4 z-4",
        className
      )}
      style={style}
    >
      <span className="font-mono text-[13px] font-medium text-muted-foreground">
        {author}
      </span>
      <div className="w-px h-4 bg-primary/25" />
      <span className="font-mono text-[13px] font-medium text-muted-foreground">
        {pad(currentSlide)} / {pad(totalSlides)}
      </span>
    </div>
  )
}
