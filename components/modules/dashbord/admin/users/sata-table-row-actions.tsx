
"use client"

import { Row } from "@tanstack/react-table"
import { User } from "@/types"
import { Button } from "@/components/ui/button"
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

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const user = row.original as User
  const { onEditUser } = useUserContext()
  const {
    updateLockStatus,
    updateEnabledStatus,
    deleteUser,
    updateRole
  } = useUsers()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Ouvrir le menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={() => onEditUser(user)}>
          <Edit className="mr-2 h-4 w-4" />
          Modifier
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => updateLockStatus.mutate({ 
            userId: user.userId, 
            lock: !user.accountNonLocked 
          })}
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
        >
          {user.enabled ? (
            <UserX className="mr-2 h-4 w-4" />
          ) : (
            <UserCheck className="mr-2 h-4 w-4" />
          )}
          {user.enabled ? 'Désactiver' : 'Activer'}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Shield className="mr-2 h-4 w-4" />
          Changer rôle
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive focus:text-destructive"
          onClick={() => deleteUser.mutate(user.userId)}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Supprimer
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}