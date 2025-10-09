"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { DataTableToolbar } from "./data-table-toolbar"
import { DataTablePagination } from "./data-table-pagination"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  enableRowSelection?: boolean
  enablePagination?: boolean
  enableToolbar?: boolean
  onRowSelectionChange?: (selected: any) => void
}

export function DataTable<TData, TValue>({
  columns,
  data,
  enableRowSelection = true,
  enablePagination = true,
  enableToolbar = true,
  onRowSelectionChange,
}: DataTableProps<TData, TValue>) {
  // Protection contre les données undefined/null
  const safeData = React.useMemo(() => Array.isArray(data) ? data : [], [data])
  const safeColumns = React.useMemo(() => Array.isArray(columns) ? columns : [], [columns])
  
  // Éviter les re-rendus inutiles pendant les mises à jour du cache
  const stableData = React.useMemo(() => safeData, [safeData.length])
  const stableColumns = React.useMemo(() => safeColumns, [safeColumns.length])
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([])

  // Gérer les changements de sélection
  const handleRowSelectionChange = React.useCallback((updater: any) => {
    setRowSelection(updater)
    if (onRowSelectionChange) {
      const newSelection = typeof updater === 'function' 
        ? updater(rowSelection) 
        : updater
      onRowSelectionChange(newSelection)
    }
  }, [onRowSelectionChange, rowSelection])

  const table = useReactTable({
    data: stableData,
    columns: stableColumns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection,
    onRowSelectionChange: handleRowSelectionChange,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    // Stabiliser la table pendant les mises à jour
    autoResetAll: false,
  })

  return (
    <div className="space-y-4">
      {enableToolbar && <DataTableToolbar table={table} />}
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={row.getIsSelected() ? "bg-muted/50" : ""}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={safeColumns.length || 1}
                  className="h-24 text-center text-muted-foreground"
                >
                  {safeData.length === 0 
                    ? "Aucune donnée disponible" 
                    : "Aucun résultat trouvé avec les filtres actuels"
                  }
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {enablePagination && <DataTablePagination table={table} />}
    </div>
  )
}