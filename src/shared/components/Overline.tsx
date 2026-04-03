import { cn } from "@/lib/utils"

interface OverlineProps {
  children: React.ReactNode
  className?: string
}

export function Overline({ children, className }: OverlineProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="h-5 w-0.75 shrink-0 rounded-sm bg-primary" />
      <span className="font-mono text-[14px] font-medium tracking-[0.28em] text-primary/80 uppercase">
        {children}
      </span>
    </div>
  )
}
