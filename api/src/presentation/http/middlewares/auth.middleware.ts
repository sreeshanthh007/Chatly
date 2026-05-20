import { redisClient } from "@infrastructure/cache/redis";
import { TokenService } from "@infrastructure/services/token.service";
import { ERROR_MESSAGE } from "@shared/constants/messages";
import { ROLE_MAP } from "@shared/constants/roleMap";
import { STATUS_CODE } from "@shared/constants/statusCode";
import { logger } from "@shared/utils/logger";
import { Request , Response, NextFunction} from "express";
import { JwtPayload } from "jsonwebtoken";

 const tokenService = new TokenService()
export interface CustomPayload extends JwtPayload {
    id:string
    email:string
    role:string
    access_token:string
    refresh_token:string
}


export interface CustomRequest extends Request {
    user:CustomPayload
}

export const extractToken = (req : Request) : {accessToken:string , refreshToken:string} | null=>{


    const basePath = req.baseUrl.split("/")
    const userType = ROLE_MAP[basePath[3]];

    if(["user" , "admin"].includes(userType)){
        return {
            accessToken : req.cookies[`${userType}_access`],
            refreshToken : req.cookies[`${userType}_refresh`]
        }
    }

    return null;

}


const isBlacklisted = async(token : string) : Promise<boolean>=>{
    
 const result = await redisClient.get(token)
 
 return result !== null
}



export const verifyAuth = async(req : Request , res : Response,next : NextFunction)=>{
    
    try {
         const token = extractToken(req);


    if(!token){
        res.status(STATUS_CODE.UNAUTHORIZED_401)
        .json({success:false,message:ERROR_MESSAGE.UNAUTHORIZED});
        return
    }


    if(await isBlacklisted(token.refreshToken)){
        res.status(STATUS_CODE.UNAUTHORIZED_401)
        .json({success:false,message:ERROR_MESSAGE.UNAUTHORIZED});
        return
    }

    const user =  tokenService.verifyAccessToken(token.accessToken) as CustomPayload

    if(!user || !user.id){
        res.status(STATUS_CODE.UNAUTHORIZED_401)
        .json({success:false,message:ERROR_MESSAGE.UNAUTHORIZED});
        return
    }


    (req as CustomRequest).user = {
        ...user,
        access_token : token.accessToken,
        refresh_token : token.refreshToken
    }

    next()
    } catch (error) {
        logger.info(error)
        res.status(STATUS_CODE.UNAUTHORIZED_401)
        .json({success:false,message:ERROR_MESSAGE.UNAUTHORIZED});
        return
    }
    
    
}


export const authorizeRole = (roles:string[])=>{

    return (req : Request , res : Response , next : NextFunction)=>{

        const role = (req as CustomRequest).user.role

        if(!roles.includes(role)){
            res.status(STATUS_CODE.UNAUTHORIZED_401)
            .json({success:false,message:ERROR_MESSAGE.UNAUTHORIZED});
            return
        }
        next();
    }
}

