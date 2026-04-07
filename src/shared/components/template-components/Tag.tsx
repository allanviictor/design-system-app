import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const tagVariants = cva(
  "inline-flex items-center rounded-full font-semibold transition-colors",
  {
    variants: {
      variant: {
        orange:
          "border border-primary/25 bg-primary/10 px-4 py-1.5 text-[13px] text-primary",
        neutral:
          "border border-foreground/10 bg-foreground/7 px-4 py-1.5 text-[13px] text-muted-foreground",
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
    <span className={cn(tagVariants({ variant }), className)}>{children}</span>
  )
}
