import { GoogleAuthRequestDTO, LoginRequestDTO, LoginResponseDTO, RegisterRequestDTO } from "@application/DTO/auth/auth.dto"


export interface IAuthUsecase {
    login(data: LoginRequestDTO) : Promise<LoginResponseDTO>  

    register(data: RegisterRequestDTO) : Promise<void>

    googleAuth(data: GoogleAuthRequestDTO) : Promise<LoginResponseDTO>

    sentOtp(email:string) : Promise<void>

    verifyOtp(email:string,otp:string) : Promise<void>

    sentOtpForForgotPassword(email:string) : Promise<void>

    verifyOtpForForgotPassword(email:string,otp:string) : Promise<void>

    forgotPassword(email:string,newPassword:string) : Promise<void>


    blackListToken(token:string) : Promise<void>

    

}