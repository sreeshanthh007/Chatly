import { LoginRequestDTO, LoginResponseDTO, RegisterRequestDTO } from "@application/DTO/auth/auth.dto";
import { TOKENS } from "@di/token";
import { IUserRepository } from "@domain/interfaces/repositories/user.repository.interface";
import { IBcryptService } from "@domain/interfaces/services/bcrypt.service.interface";
import { IEmailService } from "@domain/interfaces/services/email.service.interface";
import { IOtpService } from "@domain/interfaces/services/otp.service.interface";
import { IOtpCacheService } from "@domain/interfaces/services/otpCache.service.interface";
import { ITokenService } from "@domain/interfaces/services/token.service.interface";
import { IAuthUsecase } from "@domain/interfaces/usecases/auth/auth.usecase.interface";
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
        @inject(TOKENS.OtpBcryptService) private _otpBcryptService : IBcryptService
   ){}

    async login(data: LoginRequestDTO): Promise<LoginResponseDTO> {
        
        const user = await this._userRepo.findByEmail(data.email);

        if(!user){
            throw new CustomError(ERROR_MESSAGE.USER_NOT_FOUND,STATUS_CODE.NOT_FOUND_404)
        }

        const isPasswordValid = await this._bcryptService.compare(data.password,user.password)

        if(!isPasswordValid){
            throw new CustomError(ERROR_MESSAGE.INVALID_CREDENTIALS,STATUS_CODE.UNAUTHORIZED_401)
        }

        const accessToken = this._tokenService.generateAccessToken({
            id : user._id!.toString(),
            email : user.email
        })

        const refreshToken = this._tokenService.generateRefreshToken({
            id : user._id!.toString(),
            email : user.email
        })

        return {
            user:{
                id : user._id!.toString(),
                email : user.email,
                fullName : user.fullName,
                userName : user.userName || ""
            },
          token:{
              accessToken,
            refreshToken,
          }
            
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
            password:hashedPassword
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
}