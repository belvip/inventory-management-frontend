"use client"

import type React from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar, Navbar } from "@/components/layout"
import { useAuth } from "@/hooks/useAuth"
import { FormLoadingState } from "@/components/global"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardLayout({children}: Readonly<{
    children: React.ReactNode
}>) {
    const { isAuthenticated, isLoading, user } = useAuth()
    const router = useRouter()

    useEffect(() => {
        console.log('Dashboard Layout - isLoading:', isLoading)
        console.log('Dashboard Layout - isAuthenticated:', isAuthenticated)
        console.log('Dashboard Layout - user:', user)
        
        if (!isLoading && !isAuthenticated) {
            console.log('Dashboard Layout - Redirecting to login')
            router.push('/login')
        }
    }, [isAuthenticated, isLoading, router, user])

    if (isLoading) {
        return <FormLoadingState isLoading={true}><div /></FormLoadingState>
    }

    if (!isAuthenticated) {
        return null
    }

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