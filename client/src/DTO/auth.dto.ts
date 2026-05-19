import type { User } from "../types/user";


export interface LoginRequestDTO {
    email : string,
    password : string,
}

export interface LoginResponseDTO {
    message:string
    accessToken : string,
    refreshToken : string,
    user : User,
}


export interface RegisterRequestDTO {
  fullName: string;
  email: string;
  password: string;
}


export interface RegisterResponseDTO {
    success:boolean
    message:string
}



export interface SentOtpResponseDTO {
    message:string
}

export interface VerifyOtpRequestDTO {
    email : string,
    otp : string,
}

export interface VerifyOtpResponseDTO {
    message:string
}

