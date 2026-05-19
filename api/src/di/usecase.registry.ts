import { IAuthUsecase } from "@domain/interfaces/usecases/auth/auth.usecase.interface";
import { container } from "tsyringe";
import { TOKENS } from "./token";
import { AuthUseCase } from "@application/usecases/auth/auth.usecase";
import { IBcryptService } from "@domain/interfaces/services/bcrypt.service.interface";
import { BcryptService } from "@infrastructure/services/bcrypt.service";
import { ITokenService } from "@domain/interfaces/services/token.service.interface";
import { TokenService } from "@infrastructure/services/token.service";
import { EmailService } from "@infrastructure/services/email.service";
import { IEmailService } from "@domain/interfaces/services/email.service.interface";
import { OtpService } from "@infrastructure/services/otp.service";
import { IOtpService } from "@domain/interfaces/services/otp.service.interface";
import { IOtpCacheService } from "@domain/interfaces/services/otpCache.service.interface";
import { OtpCacheService } from "@infrastructure/services/otpCache.service";


export class UsecaseRegistry {
 
    static registerUseCasesAndServices() : void{

        container.register<IAuthUsecase>(TOKENS.AuthUseCase , AuthUseCase);

        container.register<IBcryptService>(TOKENS.BcryptService , BcryptService);

        container.register<ITokenService>(TOKENS.TokenService , TokenService);

        container.register<IEmailService>(TOKENS.EmailService , EmailService);

        container.register<IOtpService>(TOKENS.OtpService , OtpService);

        container.register<IOtpCacheService>(TOKENS.OtpCacheService , OtpCacheService);

        container.register<IBcryptService>(TOKENS.OtpBcryptService , BcryptService);
    }

}