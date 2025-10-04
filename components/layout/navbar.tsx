"use client"

import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/global"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Logo } from "@/components/global/logo"
import { User } from "lucide-react"
import { SimpleProfileModal } from "@/components/modules/profile/SimpleProfileModal"
import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"

export function Navbar() {
  const { logout } = useAuth()
  const [profileModalOpen, setProfileModalOpen] = useState(false)
  
  const handleProfileClick = () => {
    console.log('Profile button clicked')
    setProfileModalOpen(true)
  }
  
  const handleLogout = async () => {
    console.log('Logout button clicked in navbar')
    try {
      await logout()
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error)
    }
  }
  
  return (
    <nav className="border-b bg-background/80 backdrop-blur-md fixed top-0 left-0 right-0 z-50 shadow-sm lg:left-64">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <SidebarTrigger className="lg:hidden flex-shrink-0 z-10" />
            <div className="flex items-center min-w-0 flex-1 relative z-20">
              <Logo size="sm" showText={true} className="flex-shrink-0" />
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <ModeToggle />
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleProfileClick}
              className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 hover:border-primary px-2 sm:px-4"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <User className="h-4 w-4 sm:mr-2" />
              <span className="relative z-10 font-medium group-hover:text-primary transition-colors duration-300 text-xs sm:text-sm hidden sm:inline">
                Profil
              </span>
            </Button>
            <Button 
              size="sm" 
              onClick={handleLogout}
              className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary px-2 sm:px-4"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 font-medium text-xs sm:text-sm">
                Déconnexion
              </span>
            </Button>
          </div>
        </div>
      </div>
      
      <SimpleProfileModal 
        open={profileModalOpen} 
        onOpenChange={setProfileModalOpen} 
      />
    </nav>
  )
}