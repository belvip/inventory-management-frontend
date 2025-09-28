import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoadingContentProps {
  readonly size?: "sm" | "md" | "lg"
  readonly text?: string
  readonly className?: string
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-6 w-6", 
  lg: "h-8 w-8"
} as const

export function LoadingContent({ 
  size = "md", 
  text = "Chargement...",
  className 
}: LoadingContentProps) {
  return (
    <div className={cn("flex items-center justify-center py-4", className)}>
      <Loader2 className={cn("animate-spin text-primary", sizeClasses[size])} />
      {text && <span className="ml-2 text-sm text-muted-foreground">{text}</span>}
    </div>
  )
}