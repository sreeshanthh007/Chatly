import { LoginRequestDTO, LoginResponseDTO } from "@application/DTO/auth/auth.dto"


export interface IAuthUsecase {
    login(data: LoginRequestDTO) : Promise<LoginResponseDTO>  
}