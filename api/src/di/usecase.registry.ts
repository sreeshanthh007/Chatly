import { IAuthUsecase } from "@domain/interfaces/usecases/auth/auth.usecase.interface";
import { container } from "tsyringe";
import { TOKENS } from "./token";
import { AuthUseCase } from "@application/usecases/auth/auth.usecase";
import { IBcryptService } from "@domain/interfaces/services/bcrypt.service.interface";
import { BcryptService } from "@infrastructure/services/bcrypt.service";
import { ITokenService } from "@domain/interfaces/services/token.service.interface";
import { TokenService } from "@infrastructure/services/token.service";


export class UsecaseRegistry {
 
    static registerUseCasesAndServices() : void{

        container.register<IAuthUsecase>(TOKENS.AuthUseCase , AuthUseCase);

        container.register<IBcryptService>(TOKENS.BcryptService , BcryptService);

        container.register<ITokenService>(TOKENS.TokenService , TokenService);
    }

}