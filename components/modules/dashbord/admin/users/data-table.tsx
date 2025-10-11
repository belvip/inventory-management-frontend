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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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
  const safeData = Array.isArray(data) ? data : []
  const safeColumns = Array.isArray(columns) ? columns : []
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [isMobile, setIsMobile] = React.useState(false)

  // Détection mobile
  React.useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

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
    data: safeData,
    columns: safeColumns,
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
  })

  // Version mobile avec cartes
  if (isMobile && safeData.length > 0) {
    return (
      <div className="space-y-4">
        {enableToolbar && <DataTableToolbar table={table} />}
        
        <div className="space-y-4">
          {table.getRowModel().rows.map((row) => (
            <Card key={row.id} className={row.getIsSelected() ? "bg-muted/50 border-primary" : ""}>
              <CardHeader className="pb-3">
                <CardTitle className="flex justify-between items-center text-base">
                  {/* Première colonne (généralement le username) */}
                  <span>
                    {flexRender(
                      safeColumns[0].cell,
                      { ...row.getVisibleCells()[0].getContext() }
                    )}
                  </span>
                  
                  {/* Badge pour le statut (si disponible) */}
                  {safeColumns.find(col => (col as any).accessorKey === 'status') && (
                    <Badge variant="secondary">
                      {flexRender(
                        safeColumns.find(col => (col as any).accessorKey === 'status')?.cell,
                        { ...row.getVisibleCells().find(cell => (cell.column.columnDef as any).accessorKey === 'status')?.getContext() }
                      )}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                {/* Colonnes restantes (sauf la première et le statut) */}
                {safeColumns.slice(1).map((column, index) => {
                  const accessorKey = (column as any).accessorKey
                  if (accessorKey === 'status') return null
                  
                  const cellIndex = index + 1
                  if (cellIndex >= row.getVisibleCells().length) return null
                  
                  return (
                    <div key={accessorKey || index} className="flex justify-between">
                      <span className="font-medium capitalize">
                        {accessorKey?.replace(/([A-Z])/g, ' $1') || 'Field'}:
                      </span>
                      <span className="text-right">
                        {column.cell && flexRender(
                          column.cell,
                          { ...row.getVisibleCells()[cellIndex].getContext() }
                        )}
                      </span>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          ))}
        </div>
        
        {enablePagination && <DataTablePagination table={table} />}
      </div>
    )
  }

  // Version desktop originale avec améliorations
  return (
    <div className="space-y-4">
      {enableToolbar && <DataTableToolbar table={table} />}
      
      <div className="rounded-md border">
        <div className="overflow-x-auto">
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
                    <div className="overflow-x-auto flex flex-col md:flex-row items-center justify-between space-y-2">
                      {safeData.length === 0 
                        ? <div className="text-sm">Aucune donnée disponible</div> 
                        : <div className="text-sm">Aucun résultat trouvé avec les filtres actuels</div>
                      }
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      
      {enablePagination && <DataTablePagination table={table} />}
    </div>
  )
}