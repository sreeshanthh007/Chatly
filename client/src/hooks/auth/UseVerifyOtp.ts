import { useMutation } from "@tanstack/react-query";
import type { VerifyOtpRequestDTO, VerifyOtpResponseDTO } from "../../DTO/auth.dto";
import { verifyOtpService } from "../../services/auth/auth.service";
import { useCustomToast } from "../ui/UseCustomToast";



export const useVerifyOtp = () => {
    const {showError , showSuccess} = useCustomToast()
    return useMutation({
        mutationFn: (data : VerifyOtpRequestDTO) => verifyOtpService(data),
        onSuccess: (data : VerifyOtpResponseDTO) => {
            showSuccess(data.message);
        },
        onError: (error : any) => {
            showError(error.response?.data?.message);
        }
    })
}