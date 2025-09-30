import { FileX } from "lucide-react"

interface EmptyStateProps {
  readonly title?: string
  readonly description?: string
  readonly icon?: React.ReactNode
}

export function EmptyState({ 
  title = "No data", 
  description = "No items found",
  icon = <FileX className="h-12 w-12 text-muted-foreground" />
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      {icon}
      <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  )
}