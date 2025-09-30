"use client"

import type React from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar, Navbar } from "@/components/layout"

export default function DashboardLayout({children}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Navbar />
                <main className="flex-1 space-y-4 p-4 md:p-8 pt-32">{children}</main>
            </SidebarInset>
        </SidebarProvider>
    )
}