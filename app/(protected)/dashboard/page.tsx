"use client"

import { useAuthGuard } from "@/hooks/useAuthGuard"
import { LoadingContent } from "@/components/global"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardPage() {
    const { user, isLoading } = useAuthGuard(['ADMIN', 'MANAGER', 'SALES'])
    const router = useRouter()
    
    useEffect(() => {
        if (!isLoading && user) {
            const userRole = user.roles?.[0]
            switch (userRole) {
                case 'ADMIN':
                    router.push('/dashboard/admin')
                    break
                case 'MANAGER':
                    router.push('/dashboard/manager')
                    break
                case 'SALES':
                    router.push('/dashboard/sales')
                    break
                default:
                    router.push('/dashboard/admin')
            }
        }
    }, [user, isLoading, router])
    
    if (isLoading) return <LoadingContent />
    
    return <LoadingContent />
}