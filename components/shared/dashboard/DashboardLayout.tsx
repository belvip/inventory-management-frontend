import { ReactNode } from "react"

interface DashboardLayoutProps {
  children: ReactNode
  className?: string
}

export function DashboardLayout({ children, className = "" }: DashboardLayoutProps) {
  return (
    <div className={`flex-1 space-y-6 p-4 sm:p-6 lg:p-8 ${className}`}>
      {children}
    </div>
  )
}