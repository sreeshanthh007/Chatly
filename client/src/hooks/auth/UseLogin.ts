import { useMutation } from "@tanstack/react-query";
import type { LoginRequestDTO } from "../../DTO/auth.dto";
import { loginService } from "../../services/auth/auth.service";
import { useCustomToast } from "../ui/UseCustomToast";


export const Uselogin = ()=>{
    const {showError,showSuccess} = useCustomToast();
    
    return useMutation({
        mutationFn: (data: LoginRequestDTO) => loginService(data),
        onSuccess: (data) => {
            showSuccess(data.message );
        },
        onError: (error: any) => {
            console.log(error)
            showError(error.response?.data?.message);
        }
    });
}