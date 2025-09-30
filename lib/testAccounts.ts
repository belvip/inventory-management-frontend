import { Shield, User, Package } from "lucide-react"

export const TEST_ACCOUNTS = [
  { role: "Admin", username: "admin", password: "password", name: "M. Admin", icon: Shield },
  { role: "Manager", username: "manager", password: "password", name: "M. Manager", icon: User },
  { role: "Sales", username: "sales", password: "password", name: "M. Sales", icon: Package },
] as const