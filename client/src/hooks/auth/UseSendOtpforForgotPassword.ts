import { useMutation } from "@tanstack/react-query";
import { useCustomToast } from "../ui/UseCustomToast";
import { sentOtpForForgotPasswordService } from "../../services/auth/auth.service";
import type { SentOtpResponseDTO } from "../../DTO/auth.dto";


export const useSendOtpforForgotPassword = () => {
    const {showSuccess , showError} = useCustomToast()
    return useMutation({
        mutationFn: (email: string) => sentOtpForForgotPasswordService(email),
        onSuccess: (data : SentOtpResponseDTO) => {
            showSuccess(data.message);
        },
        onError: (error : any) => {
            showError(error.response?.data?.message);
        },
    });
};