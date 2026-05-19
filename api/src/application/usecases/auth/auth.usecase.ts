import { LoginRequestDTO, LoginResponseDTO } from "@application/DTO/auth/auth.dto";
import { TOKENS } from "@di/token";
import { IUserRepository } from "@domain/interfaces/repositories/user.repository.interface";
import { IBcryptService } from "@domain/interfaces/services/bcrypt.service.interface";
import { ITokenService } from "@domain/interfaces/services/token.service.interface";
import { IAuthUsecase } from "@domain/interfaces/usecases/auth/auth.usecase.interface";
import { ERROR_MESSAGE } from "@shared/constants/messages";
import { STATUS_CODE } from "@shared/constants/statusCode";
import { CustomError } from "@shared/errors/custom.error";
import { inject, injectable } from "tsyringe";


@injectable()
export class AuthUseCase implements IAuthUsecase{

   constructor(
        @inject(TOKENS.UserRepository) private _userRepo : IUserRepository,
        @inject(TOKENS.BcryptService) private _bcryptService : IBcryptService,
        @inject(TOKENS.TokenService) private _tokenService : ITokenService
   ){}

    async login(data: LoginRequestDTO): Promise<LoginResponseDTO> {
        
        const user = await this._userRepo.findByEmail(data.email);

        if(!user){
            throw new CustomError(ERROR_MESSAGE.USER_NOT_FOUND,STATUS_CODE.NOT_FOUND_404)
        }

        const isPasswordValid = await this._bcryptService.comparePassword(data.password,user.password)

        if(!isPasswordValid){
            throw new CustomError(ERROR_MESSAGE.INVALID_CREDENTIALS,STATUS_CODE.UNAUTHORIZED_401)
        }

        const accessToken = this._tokenService.generateAccessToken({
            id : user._id.toString(),
            email : user.email
        })

        const refreshToken = this._tokenService.generateRefreshToken({
            id : user._id.toString(),
            email : user.email
        })

        return {
            user:{
                id : user._id.toString(),
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
}