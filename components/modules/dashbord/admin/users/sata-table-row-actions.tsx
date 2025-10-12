"use client"

import { Row } from "@tanstack/react-table"
import { User } from "@/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  MoreHorizontal, 
  Edit, 
  Lock, 
  Unlock, 
  Trash2, 
  Shield,
  UserCheck,
  UserX
} from "lucide-react"
import { useUsers } from "@/hooks/user"
import { useUserContext } from "./UserContext"
import { RoleChangeDialog } from "./RoleChangeDialog"
import { DeleteConfirmDialog } from "@/components/global/DeleteConfirmDialog"
import { useState } from "react"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const user = row.original as User
  const { onEditUser } = useUserContext()
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const {
    updateLockStatus,
    updateEnabledStatus,
    deleteUser,
    getRoles
  } = useUsers()

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Actions</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[180px]">
          <DropdownMenuItem onClick={() => onEditUser(user)} className="text-blue-600 hover:text-blue-700">
            <Edit className="mr-2 h-4 w-4" />
            <span>Modifier</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem
            onClick={() => updateLockStatus.mutate({ 
              userId: user.userId, 
              lock: user.accountNonLocked 
            })}
            className={user.accountNonLocked ? "text-amber-600 hover:text-amber-700" : "text-green-600 hover:text-green-700"}
          >
            {user.accountNonLocked ? (
              <Lock className="mr-2 h-4 w-4" />
            ) : (
              <Unlock className="mr-2 h-4 w-4" />
            )}
            {user.accountNonLocked ? 'Verrouiller' : 'Déverrouiller'}
          </DropdownMenuItem>
          
          <DropdownMenuItem
            onClick={() => updateEnabledStatus.mutate({ 
              userId: user.userId, 
              enabled: !user.enabled 
            })}
            className={user.enabled ? "text-red-600 hover:text-red-700" : "text-green-600 hover:text-green-700"}
          >
            {user.enabled ? (
              <UserX className="mr-2 h-4 w-4" />
            ) : (
              <UserCheck className="mr-2 h-4 w-4" />
            )}
            {user.enabled ? 'Désactiver' : 'Activer'}
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem 
            onClick={() => setIsRoleDialogOpen(true)}
            className="text-purple-600 hover:text-purple-700"
          >
            <Shield className="mr-2 h-4 w-4" />
            <span>Changer rôle</span>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem
            className="text-red-600 hover:text-red-700 focus:text-red-700"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Supprimer</span>
            <DropdownMenuShortcut className="text-red-600">⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <RoleChangeDialog 
        open={isRoleDialogOpen}
        onOpenChange={setIsRoleDialogOpen}
        user={user}
        roles={getRoles.data || []}
      />
      
      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={() => {
          deleteUser.mutate(user.userId)
          setIsDeleteDialogOpen(false)
        }}
        itemName={`${user.firstName} ${user.lastName}`}
        isLoading={deleteUser.isPending}
      />
    </>
  )
}