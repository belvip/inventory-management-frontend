"use client"

import { 
  Package, Home, Users, ShoppingCart, BarChart3, Settings, 
  Archive, UserCheck, Lock, Building2, Truck, FileText,
  ChevronUp, User2, LogOut, Shield
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/hooks/useAuth"
import { UserProfileModal } from "@/components/modules/profile/UserProfileModal"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

// Navigation principale
const mainNavItems = [
  {
    title: "Accueil",
    url: "/dashboard/admin",
    icon: Home,
  },
  {
    title: "Inventaire",
    url: "/dashboard/inventory",
    icon: Package,
  },
  {
    title: "Commandes",
    url: "/dashboard/orders",
    icon: ShoppingCart,
  },
  {
    title: "Clients",
    url: "/dashboard/customers",
    icon: Users,
  },
  {
    title: "Fournisseurs",
    url: "/dashboard/suppliers",
    icon: Truck,
  },
  {
    title: "Entreprises",
    url: "/dashboard/companies",
    icon: Building2,
  },
]

// Fonctionnalités admin exclusives
const adminItems = [
  {
    title: "Gestion Utilisateurs",
    url: "/dashboard/admin/users",
    icon: UserCheck,
  },
  {
    title: "Articles Archivés",
    url: "/dashboard/admin/archived",
    icon: Archive,
  },
  {
    title: "Comptes Verrouillés",
    url: "/dashboard/admin/locked-accounts",
    icon: Lock,
  },
  {
    title: "Configuration Système",
    url: "/dashboard/admin/settings",
    icon: Settings,
  },
]

// Analytics et rapports
const analyticsItems = [
  {
    title: "Statistiques",
    url: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Rapports",
    url: "/dashboard/reports",
    icon: FileText,
  },
]

export function AppSidebar() {
  const { user } = useAuth()
  const [profileModalOpen, setProfileModalOpen] = useState(false)
  const pathname = usePathname()
  
  // Générer les initiales à partir du prénom et nom
  const getInitials = (firstName?: string, lastName?: string) => {
    if (!firstName && !lastName) return "AD"
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase()
  }
  
  // Nom complet pour l'affichage
  const fullName = user ? `${user.firstName} ${user.lastName}`.trim() : ""
  const userEmail = user?.email || ""
  const initials = getInitials(user?.firstName, user?.lastName)

  return (
    <Sidebar collapsible="icon" className="z-[60] border-r overflow-x-hidden max-w-none" style={{ '--sidebar-background': 'hsl(var(--muted))' } as React.CSSProperties}>
      <SidebarHeader>
        <div className="hidden md:flex items-center justify-between p-2">
          <SidebarTrigger />
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard/admin">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Package className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Inventory Pro</span>
                  <span className="truncate text-xs">Admin Panel</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      
      <SidebarContent className="overflow-x-hidden">
        {/* Navigation principale */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => {
                const isActive = pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a 
                        href={item.url}
                        className={cn(
                          "flex items-center gap-2 w-full p-2 rounded-md transition-colors duration-200",
                          "hover:!bg-primary/15 hover:!text-primary",
                          isActive ? "!bg-primary/15 !text-primary font-medium" : "text-sidebar-foreground"
                        )}
                      >
                        <item.icon className={cn(isActive && "!text-primary")} />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Fonctionnalités Admin */}
        <SidebarGroup>
          <SidebarGroupLabel>
            <Shield className="size-4 mr-2" />
            Administration
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item) => {
                const isActive = pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a 
                        href={item.url}
                        className={cn(
                          "flex items-center gap-2 w-full p-2 rounded-md transition-colors duration-200",
                          "hover:!bg-primary/15 hover:!text-primary",
                          isActive ? "!bg-primary/15 !text-primary font-medium" : "text-sidebar-foreground"
                        )}
                      >
                        <item.icon className={cn(isActive && "!text-primary")} />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Analytics */}
        <SidebarGroup>
          <SidebarGroupLabel>Analytics</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {analyticsItems.map((item) => {
                const isActive = pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a 
                        href={item.url}
                        className={cn(
                          "flex items-center gap-2 w-full p-2 rounded-md transition-colors duration-200",
                          "hover:!bg-primary/15 hover:!text-primary",
                          isActive ? "!bg-primary/15 !text-primary font-medium" : "text-sidebar-foreground"
                        )}
                      >
                        <item.icon className={cn(isActive && "!text-primary")} />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src="" alt={fullName} />
                    <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{fullName}</span>
                    <span className="truncate text-xs">{userEmail}</span>
                  </div>
                  <ChevronUp className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem onClick={() => setProfileModalOpen(true)}>
                  <User2 className="mr-2 h-4 w-4" />
                  <span>Profil</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Paramètres</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Déconnexion</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      
      <UserProfileModal 
        open={profileModalOpen} 
        onOpenChange={setProfileModalOpen} 
      />
    </Sidebar>
  )
}