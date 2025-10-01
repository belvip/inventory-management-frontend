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
import { useState, useCallback } from "react"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

interface NavItem {
  title: string
  url: string
  icon: React.ComponentType<{ className?: string }>
  requiredRole?: string
}

// Navigation principale
const mainNavItems: NavItem[] = [
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
const adminItems: NavItem[] = [
  {
    title: "Gestion Utilisateurs",
    url: "/dashboard/admin/users",
    icon: UserCheck,
    requiredRole: "ROLE_ADMIN",
  },
  {
    title: "Articles Archivés",
    url: "/dashboard/admin/archived",
    icon: Archive,
    requiredRole: "ROLE_ADMIN",
  },
  {
    title: "Comptes Verrouillés",
    url: "/dashboard/admin/locked-accounts",
    icon: Lock,
    requiredRole: "ROLE_ADMIN",
  },
  {
    title: "Configuration Système",
    url: "/dashboard/admin/settings",
    icon: Settings,
    requiredRole: "ROLE_ADMIN",
  },
]

// Analytics et rapports
const analyticsItems: NavItem[] = [
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

// Composant MenuItem réutilisable
interface MenuItemProps {
  item: NavItem
  isActive: boolean
  onClick?: () => void
}

function MenuItem({ item, isActive, onClick }: MenuItemProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <a 
          href={item.url}
          onClick={onClick}
          className={cn(
            "flex items-center gap-2 w-full p-2 rounded-md transition-colors duration-200",
            "hover:!bg-primary/15 hover:!text-primary focus-visible:ring-2 focus-visible:ring-primary",
            isActive ? "!bg-primary/15 !text-primary font-medium" : "text-sidebar-foreground"
          )}
          aria-current={isActive ? "page" : undefined}
        >
          <item.icon className={cn("h-4 w-4", isActive && "!text-primary")} aria-hidden="true" />
          <span>{item.title}</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

// Composant NavigationSection réutilisable
interface NavigationSectionProps {
  title: string
  items: NavItem[]
  pathname: string
  userRole?: string
  icon?: React.ComponentType<{ className?: string }>
}

function NavigationSection({ title, items, pathname, userRole, icon: Icon }: NavigationSectionProps) {
  const filteredItems = items.filter(item => 
    !item.requiredRole || item.requiredRole === userRole
  )
  
  if (filteredItems.length === 0) return null
  
  const isActiveSection = (url: string) => {
    if (url === "/dashboard/admin") return pathname === url
    return pathname.startsWith(url)
  }
  
  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        {Icon && <Icon className="size-4 mr-2" aria-hidden="true" />}
        {title}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu role="list">
          {filteredItems.map((item) => (
            <MenuItem 
              key={item.title} 
              item={item} 
              isActive={isActiveSection(item.url)}
            />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

export function AppSidebar() {
  const { user, logout } = useAuth()
  const [profileModalOpen, setProfileModalOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  
  // Vérification des permissions
  const hasAdminAccess = user?.roles?.includes("ROLE_ADMIN")
  
  // Générer les initiales à partir du prénom et nom
  const getInitials = (firstName?: string, lastName?: string) => {
    if (!firstName && !lastName) return "AD"
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase()
  }
  
  // Nom complet pour l'affichage
  const fullName = user ? `${user.firstName} ${user.lastName}`.trim() : ""
  const userEmail = user?.email || ""
  const initials = getInitials(user?.firstName, user?.lastName)
  
  // Déconnexion réelle
  const handleLogout = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault()
    console.log('handleLogout called in sidebar')
    try {
      console.log('About to call logout function')
      await logout()
      console.log('Logout completed, redirecting...')
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error)
    }
  }, [logout])

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
        <NavigationSection 
          title="Navigation" 
          items={mainNavItems} 
          pathname={pathname}
        />
        
        <SidebarSeparator />
        
        <NavigationSection 
          title="Administration" 
          items={adminItems} 
          pathname={pathname}
          userRole={user?.roles?.find(role => role === "ROLE_ADMIN")}
          icon={Shield}
        />
        
        <SidebarSeparator />
        
        <NavigationSection 
          title="Analytics" 
          items={analyticsItems} 
          pathname={pathname}
        />
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  aria-label={`Menu utilisateur pour ${fullName}`}
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
                <DropdownMenuItem 
                  onClick={() => setProfileModalOpen(true)}
                  className="cursor-pointer"
                >
                  <User2 className="mr-2 h-4 w-4" aria-hidden="true" />
                  <span>Profil</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" aria-hidden="true" />
                  <span>Paramètres</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
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