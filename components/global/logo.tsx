import { Package } from "lucide-react"

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Package className="h-8 w-8 text-primary" />
      <span className="text-xl font-bold">Inventory</span>
    </div>
  )
}