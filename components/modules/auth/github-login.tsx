"use client"

import { Button } from "@/components/ui/button"
import { FaGithub } from "react-icons/fa"

export function GithubLogin() {
    const handleGithubLogin = () => {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '') || 'http://localhost:8282'
        window.location.href = `${baseUrl}/oauth2/authorization/github`
    }

    return (
        <Button
            onClick={handleGithubLogin}
            variant="outline"
            className="w-full h-11 group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-2 hover:border-gray-400 bg-gradient-to-r from-white to-gray-50 hover:from-gray-100 hover:to-white"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/5 to-gray-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <FaGithub className="h-5 w-5 mr-3 text-gray-800 group-hover:scale-110 transition-transform duration-300 relative z-10" />
            <span className="font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300 relative z-10">
                Continuer avec GitHub
            </span>
        </Button>
    )
}