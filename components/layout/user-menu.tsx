"use client"

import { useState, useEffect } from "react"
import { LogOut, User2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { useAuth } from "@/hooks/useAuth"
import { UserProfileModal } from "@/components/modules/profile/UserProfileModal"

export function UserMenu() {
  const { user, logout } = useAuth()
  const [profileModalOpen, setProfileModalOpen] = useState(false)
  const [logoutModalOpen, setLogoutModalOpen] = useState(false)
  
  // Fermer le modal quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (logoutModalOpen && !(event.target as Element).closest('.user-menu-container')) {
        setLogoutModalOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [logoutModalOpen])
  
  // Générer les initiales à partir du prénom et nom
  const getInitials = (firstName?: string, lastName?: string) => {
    if (!firstName && !lastName) return "U"
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase()
  }
  
  // Nom complet pour l'affichage
  const fullName = user ? `${user.firstName} ${user.lastName}`.trim() : ""
  const userEmail = user?.email || ""
  const username = user?.username || ""
  const initials = getInitials(user?.firstName, user?.lastName)

  const handleLogout = async () => {
    console.log('UserMenu: Logout initiated')
    try {
      setLogoutModalOpen(false)
      await logout()
      console.log('UserMenu: Logout successful')
    } catch (error) {
      console.error('UserMenu: Logout error:', error)
    }
  }

  return (
    <div className="relative user-menu-container">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            onClick={() => {
              console.log('UserMenu: Menu button clicked')
              setLogoutModalOpen(!logoutModalOpen)
            }}
            className="hover:bg-sidebar-accent cursor-pointer data-[state=open]:bg-sidebar-accent"
          >
            <Avatar className="h-8 w-8 rounded-full">
              <AvatarImage src="" alt={fullName} />
              <AvatarFallback className="rounded-full">{initials}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
              <span className="truncate font-semibold">{fullName || username || user?.firstName || 'Utilisateur'}</span>
              <span className="truncate text-xs text-muted-foreground">{userEmail}</span>
            </div>
            <div className="hidden group-data-[collapsible=icon]:flex flex-1 items-center justify-center">
              <span className="text-sm font-semibold truncate max-w-[120px]">{fullName || username || user?.firstName || 'User'}</span>
            </div>
            <div className="flex items-center justify-center w-6 h-6">
              <div className="w-1 h-1 bg-current rounded-full mx-0.5"></div>
              <div className="w-1 h-1 bg-current rounded-full mx-0.5"></div>
              <div className="w-1 h-1 bg-current rounded-full mx-0.5"></div>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
      
      {/* Modal intégré */}
      {logoutModalOpen && (
        <div className="absolute bottom-full left-2 right-2 mb-2 bg-background border rounded-lg shadow-lg p-4 z-50">
          <div className="space-y-3">
            <div className="text-sm font-medium">Menu utilisateur</div>
            <div className="space-y-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  console.log('UserMenu: Profile button clicked')
                  setLogoutModalOpen(false)
                  setProfileModalOpen(true)
                }}
                className="w-full justify-start h-8 px-2"
              >
                <User2 className="mr-2 h-4 w-4" />
                Profil
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  console.log('UserMenu: Logout button clicked')
                  handleLogout()
                }}
                className="w-full justify-start h-8 px-2 text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Se déconnecter
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <UserProfileModal 
        open={profileModalOpen} 
        onOpenChange={setProfileModalOpen} 
      />
    </div>
  )
}