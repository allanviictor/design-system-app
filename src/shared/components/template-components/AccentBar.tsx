import { cn } from "@/lib/utils"

interface AccentBarProps {
  className?: string
}

export function AccentBar({ className }: AccentBarProps) {
  return (
    <div
      className={cn("h-1.25 w-16 rounded-full", className)}
      style={{ background: "var(--gradient-accent)" }}
    />
  )
}
