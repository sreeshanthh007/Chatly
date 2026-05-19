import { useMutation } from "@tanstack/react-query";
import { sentOtpService } from "../../services/auth/auth.service";
import { useCustomToast } from "../ui/UseCustomToast";
import type { SentOtpResponseDTO } from "../../DTO/auth.dto";


export const useSentOtp = () => {
    const {showError , showSuccess} = useCustomToast()
    return useMutation({
        mutationFn: (email: string) => sentOtpService(email),
        onSuccess: (data : SentOtpResponseDTO) => {
            showSuccess(data.message);
        },
        onError: (error : any) => {
            showError(error.response?.data?.message);
        },
    });
};