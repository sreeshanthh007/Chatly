import { GoogleAuthRequestDTO, LoginRequestDTO, LoginResponseDTO, RegisterRequestDTO } from "@application/DTO/auth/auth.dto";
import { TOKENS } from "@di/token";
import { IUserRepository } from "@domain/interfaces/repositories/user.repository.interface";
import { IBcryptService } from "@domain/interfaces/services/bcrypt.service.interface";
import { IEmailService } from "@domain/interfaces/services/email.service.interface";
import { IOtpService } from "@domain/interfaces/services/otp.service.interface";
import { IOtpCacheService } from "@domain/interfaces/services/otpCache.service.interface";
import { ITokenService } from "@domain/interfaces/services/token.service.interface";
import { IGoogleAuthService } from "@domain/interfaces/services/googleAuth.service.interface";
import { IAuthUsecase } from "@domain/interfaces/usecases/auth/auth.usecase.interface";
import { redisClient } from "@infrastructure/cache/redis";
import { ERROR_MESSAGE } from "@shared/constants/messages";
import { STATUS_CODE } from "@shared/constants/statusCode";
import { CustomError } from "@shared/errors/custom.error";
import { logger } from "@shared/utils/logger";
import { inject, injectable } from "tsyringe";


@injectable()
export class AuthUseCase implements IAuthUsecase{

   constructor(
        @inject(TOKENS.UserRepository) private _userRepo : IUserRepository,
        @inject(TOKENS.BcryptService) private _bcryptService : IBcryptService,
        @inject(TOKENS.TokenService) private _tokenService : ITokenService,
        @inject(TOKENS.EmailService) private _emailService : IEmailService,
        @inject(TOKENS.OtpService) private _otpService : IOtpService,
        @inject(TOKENS.OtpCacheService) private _otpCacheService : IOtpCacheService,
        @inject(TOKENS.OtpBcryptService) private _otpBcryptService : IBcryptService,
        @inject(TOKENS.GoogleAuthService) private _googleAuthService : IGoogleAuthService
   ){}

    async login(data: LoginRequestDTO): Promise<LoginResponseDTO> {
        
        const user = await this._userRepo.findByEmail(data.email);

        if(!user){
            throw new CustomError(ERROR_MESSAGE.USER_NOT_FOUND,STATUS_CODE.NOT_FOUND_404)
        }

        if(!user.password){
            throw new CustomError(ERROR_MESSAGE.SOCIAL_LOGIN_PASSWORD_ERROR,STATUS_CODE.BAD_REQUEST_400)
        }

        const isPasswordValid = await this._bcryptService.compare(data.password,user.password)

        if(!isPasswordValid){
            throw new CustomError(ERROR_MESSAGE.INVALID_CREDENTIALS,STATUS_CODE.UNAUTHORIZED_401)
        }

        const accessToken = this._tokenService.generateAccessToken({
            id : user._id!.toString(),
            email : user.email,
            role: user.role
        })

        const refreshToken = this._tokenService.generateRefreshToken({
            id : user._id!.toString(),
            email : user.email,
            role: user.role
        })

        return {
            user:{
                id : user._id!.toString(),
                email : user.email,
                fullName : user.fullName,
                userName : user.userName || "",
                role : user.role
            },
          token:{
              accessToken,
            refreshToken,
          }
            
        }
    }

    async googleAuth(data: GoogleAuthRequestDTO): Promise<LoginResponseDTO> {
        try {
            const payload = await this._googleAuthService.verifyIdToken(data.credential);

            let user = await this._userRepo.findByEmail(payload.email!);

            if (!user) {
                const userData = {
                    fullName: payload.name!,
                    email: payload.email!,
                    role: "user",
                    authProvider: "google",
                    profileImage: payload.picture
                };
                
                await this._userRepo.create(userData);
                user = await this._userRepo.findByEmail(payload.email!);
            }

            if (!user) {
                throw new CustomError(ERROR_MESSAGE.FAILED_TO_CREATE_USER, STATUS_CODE.INTERNAL_SERVER_ERROR_500);
            }

            const accessToken = this._tokenService.generateAccessToken({
                id: user._id!.toString(),
                email: user.email,
                role: user.role
            });

            const refreshToken = this._tokenService.generateRefreshToken({
                id: user._id!.toString(),
                email: user.email,
                role: user.role
            });

            return {
                user: {
                    id: user._id!.toString(),
                    email: user.email,
                    fullName: user.fullName,
                    userName: user.userName || "",
                    role: user.role
                },
                token: {
                    accessToken,
                    refreshToken,
                }
            };
        } catch (error) {
            logger.error("Google Auth Error:", error);
            if (error instanceof CustomError) throw error;
            throw new CustomError(ERROR_MESSAGE.GOOGLE_AUTH_FAILED, STATUS_CODE.UNAUTHORIZED_401);
        }
    }


    async register(data: RegisterRequestDTO): Promise<void> {
        
        const user = await this._userRepo.findByEmail(data.email);

        if(user){
            throw new CustomError(ERROR_MESSAGE.USER_ALREADY_EXISTS,STATUS_CODE.CONFLICT_409)
        }

        const hashedPassword = await this._bcryptService.hash(data.password)

        const userData = {
            fullName:data.fullName,
            email:data.email,
            password:hashedPassword,
            role:"user"
        }
        await this._userRepo.create(userData)

        return ;
    }


    async sentOtp(email: string): Promise<void> {
        
        const user = await this._userRepo.findByEmail(email);

        if(user){
            throw new CustomError(ERROR_MESSAGE.USER_ALREADY_EXISTS,STATUS_CODE.CONFLICT_409)
        }

        const otp = this._otpService.generateOtp();

        
        const hashedOtp = await this._otpBcryptService.hash(otp);
        
        logger.info("Generated OTP :",otp);

        await this._otpCacheService.set(email,hashedOtp,300)

        await this._emailService.sendOtpMail(email,"Chatly - verify your email",otp);
    }

    async verifyOtp(email: string, otp: string): Promise<void> {
        
        const user = await this._userRepo.findByEmail(email);

        if(user){
            throw new CustomError(ERROR_MESSAGE.USER_ALREADY_EXISTS,STATUS_CODE.CONFLICT_409)
        }

        const storedHashedOtp = await this._otpCacheService.get(email)

        if(!storedHashedOtp){
            throw new CustomError(ERROR_MESSAGE.OTP_EXPIRED,STATUS_CODE.BAD_REQUEST_400)
        }

        const isOtpValid = await this._otpBcryptService.compare(otp,storedHashedOtp);

        if(!isOtpValid){
            throw new CustomError(ERROR_MESSAGE.INVALID_OTP,STATUS_CODE.BAD_REQUEST_400)
        }

        await this._otpCacheService.del(email);

        return;
    }


    async sentOtpForForgotPassword(email: string): Promise<void> {
        
        const user = await this._userRepo.findByEmail(email);

        if(!user){
            throw new CustomError(ERROR_MESSAGE.USER_NOT_FOUND,STATUS_CODE.NOT_FOUND_404)
        }

        if(!user.password){
            throw new CustomError(ERROR_MESSAGE.SOCIAL_LOGIN_PASSWORD_ERROR,STATUS_CODE.BAD_REQUEST_400)
        }

        const otp = this._otpService.generateOtp();

        const hashedOtp = await this._otpBcryptService.hash(otp);

        logger.info("Generated OTP :",otp);

        await this._otpCacheService.set(email,hashedOtp,300)

        await this._emailService.sendOtpMail(email,"Chatly - verify your email for updating password",otp);   
    }



    async verifyOtpForForgotPassword(email: string, otp: string): Promise<void> {

        const userExist = await this._userRepo.findByEmail(email)

        if(!userExist){
            throw new CustomError(ERROR_MESSAGE.USER_NOT_FOUND,STATUS_CODE.NOT_FOUND_404)
        }

        if(!userExist.password){
            throw new CustomError(ERROR_MESSAGE.SOCIAL_LOGIN_PASSWORD_ERROR,STATUS_CODE.BAD_REQUEST_400)
        }

        const storedHashedOtp = await this._otpCacheService.get(email)

        if(!storedHashedOtp){
            throw new CustomError(ERROR_MESSAGE.OTP_EXPIRED,STATUS_CODE.BAD_REQUEST_400)
        }

        const isOtpValid = await this._otpBcryptService.compare(otp,storedHashedOtp);

        if(!isOtpValid){
            throw new CustomError(ERROR_MESSAGE.INVALID_OTP,STATUS_CODE.BAD_REQUEST_400)
        }

        await this._otpCacheService.del(email);

        return;
    }


    async forgotPassword(email: string, newPassword: string): Promise<void> {
        
        const userExist = await this._userRepo.findByEmail(email)

        if(!userExist){
            throw new CustomError(ERROR_MESSAGE.USER_NOT_FOUND,STATUS_CODE.NOT_FOUND_404)
        }

        if(!userExist.password){
            throw new CustomError(ERROR_MESSAGE.SOCIAL_LOGIN_PASSWORD_ERROR,STATUS_CODE.BAD_REQUEST_400)
        }

        const isSamePassword = await this._bcryptService.compare(newPassword,userExist.password)

        if(isSamePassword){
            throw new CustomError(ERROR_MESSAGE.SAME_PASSWORD,STATUS_CODE.BAD_REQUEST_400)
        }

        const newHashedPassword = await this._bcryptService.hash(newPassword)

        await this._userRepo.findByIdAndChangePassword(userExist._id!,newHashedPassword);

        await this._emailService.sendPasswordChangedMail(userExist.email,"Chatly - Password Changed",userExist.email);

        return;
    }


    async blackListToken(token: string): Promise<void> {

        const isTokenBlacklisted = await redisClient.get(token);

        if(isTokenBlacklisted){
            throw new CustomError(ERROR_MESSAGE.TOKEN_ALREADY_BLACKLISTED,STATUS_CODE.BAD_REQUEST_400)
        }

        
        await redisClient.set(token, "blacklisted", "EX", 7 * 24 * 60 * 60);

        return;
    }

}