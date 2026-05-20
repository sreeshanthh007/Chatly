import { API_ENDPOINTS } from "../../constants/apiEndpoints";
import type { ForgotPasswordRequestDTO, ForgotPasswordResponseDTO, LoginRequestDTO, LoginResponseDTO, LogoutResponseDTO, RegisterRequestDTO, RegisterResponseDTO, SentOtpResponseDTO, VerifyOtpRequestDTO, VerifyOtpResponseDTO } from "../../DTO/auth.dto";
import api from "../../lib/axios";


export const loginService = async (data : LoginRequestDTO) : Promise<LoginResponseDTO> =>{

    const result =  await api.post(API_ENDPOINTS.LOGIN,data)

    return result.data 
}


export const registerService = async (data : RegisterRequestDTO) : Promise<RegisterResponseDTO> =>{

    const result =  await api.post(API_ENDPOINTS.REGISTER,data)

    return result.data 
}


export const sentOtpService = async (email : string) : Promise<SentOtpResponseDTO> =>{

    const result =  await api.post(API_ENDPOINTS.SENT_OTP,{email})

    return result.data
}

export const verifyOtpService = async (data : VerifyOtpRequestDTO) : Promise<VerifyOtpResponseDTO> =>{

    const result =  await api.post(API_ENDPOINTS.VERIFY_OTP,data)

    return result.data
}

export const sentOtpForForgotPasswordService = async (email : string) : Promise<SentOtpResponseDTO> =>{

    const result =  await api.post(API_ENDPOINTS.SENT_OTP_FOR_FORGOT_PASSWORD,{email})

    return result.data
}

export const verifyOtpForForgotPasswordService = async (data : VerifyOtpRequestDTO) : Promise<VerifyOtpResponseDTO> =>{

    const result =  await api.post(API_ENDPOINTS.VERIFY_OTP_FOR_FORGOT_PASSWORD,data)

    return result.data
}

export const forgotPasswordService = async (data : ForgotPasswordRequestDTO) : Promise<ForgotPasswordResponseDTO> =>{

    const result =  await api.patch(API_ENDPOINTS.FORGOT_PASSWORD,data)

    return result.data
}

export const logoutService = async () : Promise<LogoutResponseDTO> =>{

    const result =  await api.post(API_ENDPOINTS.USER_LOGOUT)

    return result.data
}

