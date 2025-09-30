import { Loader2 } from "lucide-react"

interface FormLoadingStateProps {
  readonly isLoading: boolean
  readonly children: React.ReactNode
}

export function FormLoadingState({ isLoading, children }: FormLoadingStateProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <span className="ml-2 text-sm text-muted-foreground">Chargement...</span>
      </div>
    )
  }

  return <>{children}</>
}