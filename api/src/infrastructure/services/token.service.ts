import { ITokenService } from "@domain/interfaces/services/token.service.interface";
import { CONFIG } from "@shared/config";
import { logger } from "@shared/utils/logger";
import jwt,{ JwtPayload, Secret } from "jsonwebtoken";
import ms from "ms";

interface JwtPayloadData {
    id:string,
    email:string,
    role:string
}


export class TokenService implements ITokenService {

    private jwtSecret : Secret
    private accessExpiresIn : string
    private refreshExpiresIn : string

    constructor(){
        this.jwtSecret = CONFIG.JWT_SECRET_KEY
        this.accessExpiresIn = CONFIG.ACCESS_EXPIRES_IN
        this.refreshExpiresIn = CONFIG.REFRESH_EXPIRES_IN
    }
    generateAccessToken(payload: JwtPayloadData): string {
        return jwt.sign(payload , this.jwtSecret , {
            expiresIn : this.accessExpiresIn as ms.StringValue
        })
    }

    generateRefreshToken(payload: JwtPayloadData): string {
        return jwt.sign(payload , this.jwtSecret , {
            expiresIn : this.refreshExpiresIn as ms.StringValue
        })
    }

    verifyAccessToken(token: string): JwtPayload | null {
        try {
            return jwt.verify(token,this.jwtSecret) as JwtPayload
        } catch (error) {
            logger.info("error verifying access token",error)
            return null
        }
    }

    decodeAccessToken(token: string): JwtPayload | null {
        try {
            return jwt.decode(token) as JwtPayload
        } catch (error) {
            logger.info("error decoding access token",error)
            return null
        }
    }   

    verifyRefreshToken(token: string): JwtPayload | null {
        try {
            return jwt.verify(token,this.jwtSecret) as JwtPayload
        } catch (error) {
            logger.info("error verifying refresh token",error)
            return null
        }
    }

}