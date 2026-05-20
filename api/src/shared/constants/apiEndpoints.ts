


export const API_ENDPOINTS = {
    
    AUTH :{
        REGISTER : "/register",
        LOGIN : "/login",
        SENT_OTP : "/sent-otp",
        VERIFY_OTP : "/verify-otp",
        SENT_OTP_FOR_FORGOT_PASSWORD : "/sent-otp/forgot-password",
        VERIFY_OTP_FOR_FORGOT_PASSWORD : "/verify-otp/forgot-password",
        FORGOT_PASSWORD : "/forgot-password",
        GOOGLE_AUTH : "/google-auth",
    },

    USER:{
        USER_LOGOUT : "/logout",
    }


} as const