"use client"

import { useUsersAdmin } from "@/hooks/user"
import { useAuth } from "@/hooks/useAuth"
import { DataTable } from "./data-table"
import { columns } from "./columns"
import { Button } from "@/components/ui/button"
import { Plus, Users, UserCheck, UserX, Shield, Lock } from "lucide-react"
import { UserForm } from "./UserForm"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { UserProvider } from "./UserContext"
import type { User } from "@/types/user"
import { toast } from "sonner"

export function AdminUser() {
  const { user: currentUser, isAuthenticated, isLoading: authLoading, accessToken } = useAuth()
  const { users, isLoading } = useUsersAdmin()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)

  // Fonction pour gérer l'édition avec vérification du token
  const handleEditUser = (user: User) => {
    console.log('handleEditUser called with:', user)
    console.log('Current accessToken:', accessToken ? 'Present' : 'Missing')
    console.log('Current user:', currentUser)
    
    if (!accessToken) {
      console.error('No access token available')
      toast.error("Session expirée", { 
        description: "Veuillez vous reconnecter" 
      })
      return
    }
    
    console.log('Setting editing user:', user)
    setEditingUser(user)
  }

  // Debug: Vérifier l'utilisateur actuel
  useEffect(() => {
    console.log('AdminUser - Current user:', currentUser)
    console.log('AdminUser - User role:', currentUser?.roleName)
    console.log('AdminUser - Is authenticated:', isAuthenticated)
    console.log('AdminUser - Auth loading:', authLoading)
  }, [currentUser, isAuthenticated, authLoading])

  // Vérifier si l'utilisateur a le rôle ADMIN
  const isAdmin = currentUser?.roleName === 'ROLE_ADMIN' || 
                  (currentUser as { roles?: string[] })?.roles?.includes('ROLE_ADMIN')
  
  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }
  
  if (!isAuthenticated || !currentUser) {
    return (
      <div className="flex items-center justify-center h-96">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">Non authentifié</h2>
            <p className="text-muted-foreground">Vous devez être connecté pour accéder à cette page.</p>
          </CardContent>
        </Card>
      </div>
    )
  }
  
  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center h-96">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">Accès refusé</h2>
            <p className="text-muted-foreground">Vous n&apos;avez pas les permissions nécessaires pour accéder à cette page.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const stats = {
    total: users?.length || 0,
    active: users?.filter(u => u.enabled && u.accountNonLocked)?.length || 0,
    locked: users?.filter(u => u.enabled && !u.accountNonLocked)?.length || 0,
    inactive: users?.filter(u => !u.enabled)?.length || 0,
    admins: users?.filter(u => u.roleName === 'ROLE_ADMIN')?.length || 0
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Debug: Afficher les données
  console.log('AdminUser - Users data:', users)
  console.log('AdminUser - Users type:', typeof users)
  console.log('AdminUser - Users is array:', Array.isArray(users))
  console.log('AdminUser - Is loading:', isLoading)
  console.log('AdminUser - Is admin:', isAdmin)
  console.log('AdminUser - Columns:', columns)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Utilisateurs</h1>
          <p className="text-muted-foreground">
            Gérez les utilisateurs, leurs rôles et permissions
          </p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nouvel Utilisateur
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card className="group relative overflow-hidden transition-all duration-300 ease-out hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary/5 before:to-transparent before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium group-hover:text-primary transition-colors duration-300">Total</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground group-hover:scale-110 group-hover:text-primary transition-all duration-300" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold group-hover:scale-105 transition-transform duration-300">{stats.total}</div>
          </CardContent>
        </Card>
        
        <Card className="group relative overflow-hidden transition-all duration-300 ease-out hover:shadow-xl hover:shadow-green-500/10 hover:-translate-y-1 before:absolute before:inset-0 before:bg-gradient-to-r before:from-green-500/5 before:to-transparent before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium group-hover:text-green-600 transition-colors duration-300">Actifs</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600 group-hover:scale-110 transition-all duration-300" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 group-hover:scale-105 transition-transform duration-300">{stats.active}</div>
          </CardContent>
        </Card>
        
        <Card className="group relative overflow-hidden transition-all duration-300 ease-out hover:shadow-xl hover:shadow-orange-500/10 hover:-translate-y-1 before:absolute before:inset-0 before:bg-gradient-to-r before:from-orange-500/5 before:to-transparent before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium group-hover:text-orange-600 transition-colors duration-300">Verrouillés</CardTitle>
            <Lock className="h-4 w-4 text-orange-600 group-hover:scale-110 transition-all duration-300" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600 group-hover:scale-105 transition-transform duration-300">{stats.locked}</div>
          </CardContent>
        </Card>
        
        <Card className="group relative overflow-hidden transition-all duration-300 ease-out hover:shadow-xl hover:shadow-red-500/10 hover:-translate-y-1 before:absolute before:inset-0 before:bg-gradient-to-r before:from-red-500/5 before:to-transparent before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium group-hover:text-red-600 transition-colors duration-300">Inactifs</CardTitle>
            <UserX className="h-4 w-4 text-red-600 group-hover:scale-110 transition-all duration-300" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600 group-hover:scale-105 transition-transform duration-300">{stats.inactive}</div>
          </CardContent>
        </Card>
        
        <Card className="group relative overflow-hidden transition-all duration-300 ease-out hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-500/5 before:to-transparent before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium group-hover:text-blue-600 transition-colors duration-300">Admins</CardTitle>
            <Shield className="h-4 w-4 text-blue-600 group-hover:scale-110 transition-all duration-300" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600 group-hover:scale-105 transition-transform duration-300">{stats.admins}</div>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des Utilisateurs</CardTitle>
        </CardHeader>
        <CardContent>
          <UserProvider onEditUser={handleEditUser}>
            <DataTable columns={columns} data={users || []} />
          </UserProvider>
        </CardContent>
      </Card>

      {/* Create User Modal */}
      <UserForm 
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        mode="create"
      />
      
      {/* Edit User Modal */}
      {editingUser && (
        <UserForm 
          open={!!editingUser}
          onOpenChange={(open) => !open && setEditingUser(null)}
          mode="edit"
          user={editingUser}
        />
      )}
    </div>
  )
}