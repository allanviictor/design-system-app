import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const tagVariants = cva(
  "inline-flex items-center rounded-full font-semibold transition-colors",
  {
    variants: {
      variant: {
        orange: "bg-primary/10 text-primary border border-primary/25 font-mono text-[13px] px-4 py-1.5",
        neutral: "bg-foreground/7 text-muted-foreground border border-foreground/10 font-mono text-[13px] px-4 py-1.5",
      },
    },
    defaultVariants: {
      variant: "orange",
    },
  }
)

interface TagProps extends VariantProps<typeof tagVariants> {
  children: React.ReactNode
  className?: string
}

export function Tag({ children, variant, className }: TagProps) {
  return (
    <span className={cn(tagVariants({ variant }), className)}>
      {children}
    </span>
  )
}
