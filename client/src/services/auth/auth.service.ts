import { API_ENDPOINTS } from "../../constants/apiEndpoints";
import type { LoginRequestDTO, LoginResponseDTO, RegisterRequestDTO, RegisterResponseDTO } from "../../DTO/auth.dto";
import api from "../../lib/axios";


export const loginService = async (data : LoginRequestDTO) : Promise<LoginResponseDTO> =>{

    const result =  await api.post(API_ENDPOINTS.LOGIN,data)

    return result.data.data 
}


export const registerService = async (data : RegisterRequestDTO) : Promise<RegisterResponseDTO> =>{

    const result =  await api.post(API_ENDPOINTS.REGISTER,data)

    return result.data.data 
}