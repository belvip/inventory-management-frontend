import { type UserRole } from "@/types"
import {
  LayoutDashboard,
} from "lucide-react"

export interface NavigationItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
  roles: string[]
}

export const navigationConfig: NavigationItem[] = [
  {
    title: "Tableau de bord",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: ["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_SALES"],
  }
];

export function getNavigationForRole(userRoles: string[]): NavigationItem[] {
  return navigationConfig.filter((item) => 
    item.roles.some(role => userRoles.includes(role))
  )
}

export function getNavigationForSingleRole(role: UserRole): NavigationItem[] {
  const roleWithPrefix = `ROLE_${role}`
  return navigationConfig.filter((item) => item.roles.includes(roleWithPrefix))
}
