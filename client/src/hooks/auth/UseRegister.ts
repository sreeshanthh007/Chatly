import { useMutation } from "@tanstack/react-query"
import type { RegisterRequestDTO, RegisterResponseDTO } from "../../DTO/auth.dto"
import { registerService } from "../../services/auth/auth.service"
import { useCustomToast } from "../ui/UseCustomToast"


export const UseRegister = () => {
    const {showSuccess , showError} = useCustomToast()
    return useMutation<RegisterResponseDTO , Error , RegisterRequestDTO>({
        mutationFn: (data: RegisterRequestDTO) => registerService(data),
        onSuccess:(data:RegisterResponseDTO)=>{

            showSuccess(data.message)
        },  
        onError:(error:any)=>{
            showError(error.response?.data.message)
        }
    })
}