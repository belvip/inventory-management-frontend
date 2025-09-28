import { Package } from "lucide-react"
import { cn } from "@/lib/utils"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  showText?: boolean
  className?: string
}

const sizeClasses = {
  sm: { icon: "h-6 w-6", text: "text-lg" },
  md: { icon: "h-8 w-8", text: "text-xl" },
  lg: { icon: "h-10 w-10", text: "text-2xl" }
}

export function Logo({ size = "md", showText = true, className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Package className={cn("text-primary", sizeClasses[size].icon)} />
      {showText && (
        <span className={cn("font-bold text-foreground", sizeClasses[size].text)}>
          Inventory
        </span>
      )}
    </div>
  )
}