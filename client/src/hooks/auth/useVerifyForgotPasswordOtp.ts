import { useMutation } from "@tanstack/react-query";
import type { VerifyOtpRequestDTO, VerifyOtpResponseDTO } from "../../DTO/auth.dto";
import { verifyOtpForForgotPasswordService } from "../../services/auth/auth.service";
import { useCustomToast } from "../ui/UseCustomToast";


export const useVerifyForgotPasswordOtp = () => {
    const {showSuccess , showError} = useCustomToast()
    return useMutation({
        mutationFn: (data : VerifyOtpRequestDTO) => verifyOtpForForgotPasswordService(data),
        onSuccess: (data : VerifyOtpResponseDTO) => {
            showSuccess(data.message);
        },
        onError: (error : any) => {
            showError(error.response?.data?.message);
        },
    });
};