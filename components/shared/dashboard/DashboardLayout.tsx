import { ReactNode } from "react"

interface DashboardLayoutProps {
  children: ReactNode
  className?: string
}

export function DashboardLayout({ children, className = "" }: DashboardLayoutProps) {
  return (
    <div className={`flex-1 space-y-6 p-3 sm:p-6 lg:p-8 mt-2 sm:mt-4 md:mt-6 ${className}`}>
      {children}
    </div>
  )
}