"use client"

import { useState, useMemo } from "react"
import { LogOut, User2, ChevronUp } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/hooks/useAuth"
import { UserProfileModal } from "@/components/modules/profile/UserProfileModal"
import { useUserStore } from "@/stores/userStore"

export function UserMenu() {
  const { logout } = useAuth()
  const { user } = useUserStore()
  const [profileModalOpen, setProfileModalOpen] = useState(false)
  
  const getInitials = (firstName?: string, lastName?: string) => {
    if (!firstName && !lastName) return "U"
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase()
  }
  
  const fullName = useMemo(() => 
    user?.firstName && user?.lastName 
      ? `${user.firstName} ${user.lastName}`.trim() 
      : "",
    [user?.firstName, user?.lastName]
  )
  
  const userEmail = user?.email || ""
  const username = user?.username || ""
  const initials = useMemo(() => 
    getInitials(user?.firstName, user?.lastName),
    [user?.firstName, user?.lastName]
  )

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('UserMenu: Logout error:', error)
    }
  }

  return (
    <div className="relative">
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="hover:bg-sidebar-accent cursor-pointer data-[state=open]:bg-sidebar-accent"
              >
                <Avatar className="h-8 w-8 rounded-full">
                  <AvatarImage src={user?.image || ""} alt={fullName} />
                  <AvatarFallback className="rounded-full">{initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0 px-2">
                  <span className="text-sm font-semibold truncate block">
                    {fullName || username || 'Utilisateur'}
                  </span>
                  {userEmail && (
                    <span className="text-xs text-muted-foreground truncate block">
                      {userEmail}
                    </span>
                  )}
                </div>
                <ChevronUp className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => setProfileModalOpen(true)}>
                <User2 className="mr-2 h-4 w-4" />
                <span>Profil</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={handleLogout}
                className="text-destructive focus:text-destructive"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Se déconnecter</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
      
      <UserProfileModal 
        open={profileModalOpen} 
        onOpenChange={setProfileModalOpen} 
      />
    </div>
  )
}