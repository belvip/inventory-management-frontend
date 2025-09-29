import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { SignupRequest, SignupResponse } from "@/types"
import { signupService } from "@/service/signupService"
import { useRouter } from "next/navigation"

export function useSignup() {
  const router = useRouter()
  
  return useMutation<SignupResponse, Error, SignupRequest>({
    mutationFn: signupService.register,
    onSuccess: () => {
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    },
    onError: (error) => {
      toast.error("Erreur", { description: error.message })
    }
  })
}