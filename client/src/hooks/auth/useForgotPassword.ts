import { useMutation } from "@tanstack/react-query";
import { useCustomToast } from "../ui/UseCustomToast";
import type { ForgotPasswordRequestDTO, ForgotPasswordResponseDTO } from "../../DTO/auth.dto";
import { forgotPasswordService } from "../../services/auth/auth.service";


export const useForgotPassword = () => {
    const {showSuccess , showError} = useCustomToast()
    return useMutation({
        mutationFn: (data : ForgotPasswordRequestDTO) => forgotPasswordService(data),
        onSuccess: (data : ForgotPasswordResponseDTO) => {
            showSuccess(data.message);
        },
        onError: (error : any) => {
            showError(error.response?.data?.message);
        },
    });
};