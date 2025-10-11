// components/users/data-table-toolbar.tsx
"use client"

import * as React from "react"
import { Table } from "@tanstack/react-table"
import { User } from "@/types"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DataTableViewOptions } from "./data-table-view-options"
import { X } from "lucide-react"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

const roles = [
  { label: "Admin", value: "ROLE_ADMIN" },
  { label: "Manager", value: "ROLE_MANAGER" },
  { label: "Sales", value: "ROLE_SALES" },
  { label: "User", value: "ROLE_USER" },
]

const statuses = [
  { label: "Actif", value: "active" },
  { label: "Verrouillé", value: "locked" },
  { label: "Désactivé", value: "disabled" },
]

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex flex-col md:flex-row items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Rechercher utilisateurs..."
          value={(table.getColumn("userName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("userName")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[200px]"
        />
        <Input
          type="date"
          placeholder="Date de création"
          value={(table.getColumn("createdDate")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("createdDate")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px]"
        />
        {table.getColumn("roleName") && (
          <DataTableFacetedFilter
            column={table.getColumn("roleName")}
            title="Rôle"
            options={roles}
          />
        )}
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Statut"
            options={statuses}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Réinitialiser
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}