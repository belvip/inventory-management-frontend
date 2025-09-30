import type React from "react"
import { getAuthenticatedUser } from "@/lib/serverAuth"
import { UserRoles } from "@/types"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar, Navbar } from "@/components/layout"

export default async function DashboardLayout({children, admin, manager, sales}: Readonly<{
    children: React.ReactNode
    admin: React.ReactNode
    manager: React.ReactNode
    sales: React.ReactNode
}>) {
    const { user } = await getAuthenticatedUser({
        allowedRoles: [UserRoles.ADMIN, UserRoles.MANAGER, UserRoles.SALES],
        authRedirect: "/login",
        authzRedirect: "/unauthorized",
    })

    // Render role-specific content using slots
    const renderRoleContent = () => {
        const userRole = user?.roles?.[0]; // Get first role
        switch (userRole) {
            case UserRoles.ADMIN:
                return admin
            case UserRoles.MANAGER:
                return manager
            case UserRoles.SALES:
                return sales
            default:
                return children
        }
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Navbar />
                <main className="flex-1 space-y-4 p-4 md:p-8">{renderRoleContent()}</main>
            </SidebarInset>
        </SidebarProvider>
    )
}