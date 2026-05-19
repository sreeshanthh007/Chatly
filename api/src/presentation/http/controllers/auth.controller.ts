import { Request, Response} from "express";
import { inject, injectable } from "tsyringe";
import { loginSchema } from "../validators/auth/login.validator";
import { TOKENS } from "@di/token";
import { IAuthUsecase } from "@domain/interfaces/usecases/auth/auth.usecase.interface";
import { STATUS_CODE } from "@shared/constants/statusCode";
import { SUCCESS_MESSAGE } from "@shared/constants/messages";




@injectable()
export class AuthController {

   constructor(
    @inject(TOKENS.AuthUseCase)
    private readonly _authUseCase : IAuthUsecase
   ){}


     async loginController(req:Request , res : Response)  {

        const {email , password} = req.body;

        const result = loginSchema.safeParse({email , password});

        if(!result.success){
             res.status(400).json({success : false , message : result.error?.issues[0].message});
             return;
        }

        const data = await this._authUseCase.login(result.data)

        res.status(STATUS_CODE.OK_200).json({
            success:true,
            message:SUCCESS_MESSAGE.LOGIN_SUCCESS,
            data:data
        });
        return;
    }
}