import { cn } from "@/lib/utils"
import Image from "next/image"

interface AvatarProps {
  readonly src?: string
  readonly alt?: string
  readonly fallback: string
  readonly size?: "sm" | "md" | "lg" | "xl"
  readonly className?: string
}

const sizeClasses = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm", 
  lg: "w-14 h-14 text-lg",
  xl: "w-16 h-16 text-xl"
} as const

export function Avatar({ src, alt, fallback, size = "md", className }: AvatarProps) {
  return (
    <div className="relative">
      <div className={cn(
        "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-full flex items-center justify-center font-bold shadow-lg overflow-hidden",
        sizeClasses[size],
        className
      )}>
        {src ? (
          <Image
            src={src}
            alt={alt || fallback}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          fallback
        )}
      </div>
      <div className="absolute -inset-1 bg-gradient-to-br from-primary/30 to-transparent rounded-full -z-10"></div>
    </div>
  )
}