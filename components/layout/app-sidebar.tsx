"use client"

import { Package } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { useAuth } from "@/hooks/useAuth"
import { UserMenu } from "@/components/layout/user-menu"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { getNavigationForRole } from "@/lib/navigation"



export function AppSidebar() {
  const { user } = useAuth()
  const pathname = usePathname()
  
  // Récupération de la navigation basée sur les rôles de l'utilisateur
  const navigationItems = user?.roleName ? getNavigationForRole([user.roleName]) : []
  
  // Debug temporaire
  console.log('Current user role:', user?.roleName)
  console.log('Navigation items for user:', navigationItems.map(item => item.title))
  
  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard" || pathname === "/dashboard/admin" || pathname === "/dashboard/manager" || pathname === "/dashboard/sales"
    }
    return pathname === href
  }

  return (
    <Sidebar collapsible="icon" className="z-[60] border-r overflow-x-hidden max-w-none" style={{ '--sidebar-background': 'hsl(var(--muted))' } as React.CSSProperties}>
      <SidebarHeader>
        <div className="flex items-center justify-end p-2">
          <SidebarTrigger />
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Package className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Inventory Pro</span>
                  <span className="truncate text-xs">Dashboard</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      
      <SidebarContent className="overflow-x-hidden">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild>
                    <a 
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2 w-full p-2 rounded-md transition-colors duration-200",
                        "hover:!bg-primary/15 hover:!text-primary focus-visible:ring-2 focus-visible:ring-primary",
                        isActive(item.href) ? "!bg-primary/15 !text-primary font-medium" : "text-sidebar-foreground"
                      )}
                      aria-current={isActive(item.href) ? "page" : undefined}
                    >
                      <item.icon className={cn("h-4 w-4", isActive(item.href) && "!text-primary")} aria-hidden="true" />
                      <span>{item.title}</span>
                      {item.badge && (
                        <span className="ml-auto text-xs bg-primary/20 text-primary px-1 rounded">
                          {item.badge}
                        </span>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <UserMenu />
      </SidebarFooter>
    </Sidebar>
  )
}