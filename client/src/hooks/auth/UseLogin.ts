import { useMutation } from "@tanstack/react-query";
import type { LoginRequestDTO, LoginResponseDTO } from "../../DTO/auth.dto";
import { loginService } from "../../services/auth/auth.service";
import { useCustomToast } from "../ui/UseCustomToast";


import { useDispatch } from "react-redux";
import { login } from "../../store/userSlice";

export const Uselogin = ()=>{
    const {showError,showSuccess} = useCustomToast();
    const dispatch = useDispatch();
    
    return useMutation({
        mutationFn: (data: LoginRequestDTO) => loginService(data),
        onSuccess: (data: LoginResponseDTO) => {
            dispatch(login({ userName: data.data.fullName }));
            showSuccess(data.message );
        },
        onError: (error: any) => {
            console.log(error)
            showError(error.response?.data?.message);
        }
    });
}