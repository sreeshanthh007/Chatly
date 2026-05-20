

export interface User {
    _id?:string;
    fullName : string;
    email : string;
    userName?:string;
    role:string;
    password? : string
    authProvider?: string;
    profileImage?:string;
    
} 