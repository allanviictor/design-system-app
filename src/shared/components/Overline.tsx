import { cn } from "@/lib/utils"

interface OverlineProps {
  children: React.ReactNode
  className?: string
}

export function Overline({ children, className }: OverlineProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="w-0.75 h-5 bg-primary rounded-sm shrink-0" />
      <span className="font-mono text-[14px] font-medium uppercase tracking-[0.28em] text-primary/80">
        {children}
      </span>
    </div>
  )
}
