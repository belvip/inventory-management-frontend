
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { User } from "@/types"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./sata-table-row-actions"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "userName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
    cell: ({ row }) => {
      const user = row.original
      return (
        <div className="flex items-center gap-3">
          <img 
            src={user.imageUrl || '/default-avatar.png'} 
            alt={user.userName}
            className="h-8 w-8 rounded-full"
          />
          <div className="flex flex-col">
            <span className="font-medium">@{user.userName}</span>
            <span className="text-sm text-muted-foreground">
              {user.firstName} {user.lastName}
            </span>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      const email = row.getValue("email") as string
      return <div className="lowercase">{email}</div>
    },
  },
  {
    accessorKey: "roleName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rôle" />
    ),
    cell: ({ row }) => {
      const roleName = row.getValue("roleName") as string
      const role = roleName.replace('ROLE_', '')
      
      const roleVariants = {
        ADMIN: "destructive",
        MANAGER: "default", 
        SALES: "secondary",
        USER: "outline"
      } as const

      return (
        <Badge variant={roleVariants[role as keyof typeof roleVariants] || "outline"}>
          {role}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Statut" />
    ),
    cell: ({ row }) => {
      const user = row.original
      
      if (!user.enabled) {
        return <Badge variant="destructive">Désactivé</Badge>
      }
      if (!user.accountNonLocked) {
        return <Badge variant="secondary">Verrouillé</Badge>
      }
      return <Badge variant="success">Actif</Badge>
    },
    filterFn: (row, id, value) => {
      const user = row.original
      if (value === "active") return user.enabled && user.accountNonLocked
      if (value === "locked") return !user.accountNonLocked
      if (value === "disabled") return !user.enabled
      return true
    },
  },
  {
    accessorKey: "isTwoFactorEnabled",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="2FA" />
    ),
    cell: ({ row }) => {
      const is2FA = row.getValue("isTwoFactorEnabled") as boolean
      return (
        <Badge variant={is2FA ? "default" : "outline"}>
          {is2FA ? "Activé" : "Désactivé"}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]