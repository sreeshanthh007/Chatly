

export interface LoginResponseDTO {
    user : {
        id : string,
        email : string,
        fullName : string,
        userName : string,
        role:string,
    },
    token : {
        accessToken : string,
        refreshToken : string,
    }
    
}

export interface LoginRequestDTO {
 email:string;
 password:string;   
}


export interface RegisterRequestDTO {
    fullName : string,
    email : string,
    password : string,
}

export interface GoogleAuthRequestDTO {
    credential: string;
}