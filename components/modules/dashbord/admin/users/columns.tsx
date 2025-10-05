
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
      <DataTableColumnHeader column={column} title="Utilisateur" />
    ),
    cell: ({ row }) => {
      const user = row.original
      return (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-medium text-primary">
              {user.firstName?.[0] || user.userName?.[0] || 'U'}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-medium">{user.firstName} {user.lastName}</span>
            <span className="text-sm text-muted-foreground">@{user.userName}</span>
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
      
      const roleStyles = {
        ADMIN: "bg-red-100 text-red-800 hover:bg-red-200 border-red-200",
        MANAGER: "bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200", 
        SALES: "bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-200",
        USER: "bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-200"
      } as const

      return (
        <Badge className={roleStyles[role as keyof typeof roleStyles] || "bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-200"}>
          {role}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: "status",
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
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Actif</Badge>
    },
    filterFn: (row, id, value) => {
      const user = row.original
      return value.some((status: string) => {
        if (status === "active") return user.enabled && user.accountNonLocked
        if (status === "locked") return user.enabled && !user.accountNonLocked
        if (status === "disabled") return !user.enabled
        return false
      })
    },
  },
  {
    accessorKey: "createdDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date de création" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("createdDate") as string
      return (
        <div className="text-sm">
          {new Date(date).toLocaleDateString('fr-FR')}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      const rowDate = new Date(row.getValue(id) as string).toISOString().split('T')[0]
      return rowDate === value
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]