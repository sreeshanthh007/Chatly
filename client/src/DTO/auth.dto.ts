


export interface LoginRequestDTO {
    email : string,
    password : string,
}

export interface LoginResponseDTO {
    success: boolean;
    message: string;
    data: {
        id: string,
        email: string,
        fullName: string,
        userName: string,
    };
    token : {
        accessToken: string,
        refreshToken: string,
    }
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


export interface ForgotPasswordRequestDTO {
    email : string,
    newPassword : string,
}

export interface ForgotPasswordResponseDTO {
    success: boolean;
    message: string;
}




export interface LogoutResponseDTO {
    success:boolean
    message:string
}