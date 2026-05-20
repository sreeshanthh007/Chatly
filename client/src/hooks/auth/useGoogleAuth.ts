import { useMutation } from "@tanstack/react-query";
import type { LoginResponseDTO } from "../../DTO/auth.dto";
import { googleAuthService } from "../../services/auth/auth.service";
import { useCustomToast } from "../ui/UseCustomToast";
import { useDispatch } from "react-redux";
import { login } from "../../store/userSlice";

export const useGoogleAuth = () => {
    const { showError, showSuccess } = useCustomToast();
    const dispatch = useDispatch();
    
    return useMutation({
        mutationFn: (credential: string) => googleAuthService(credential),
        onSuccess: (data: LoginResponseDTO) => {
            dispatch(login({ userName: data.data.fullName }));
            showSuccess(data.message);
        },
        onError: (error: any) => {
            console.log(error);
            showError(error.response?.data?.message || "Google authentication failed");
        }
    });
};
