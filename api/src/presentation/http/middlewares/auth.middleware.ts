import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";


export interface CustomPayload extends JwtPayload {
    id:string
    email:string
    access_token:string
    refresh_token:string
}


export interface CustomRequest extends Request {
    user:CustomPayload
}



