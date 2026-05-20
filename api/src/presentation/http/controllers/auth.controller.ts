import { Request, Response} from "express";
import { inject, injectable } from "tsyringe";
import { loginSchema } from "../validators/auth/login.validator";
import { registerSchema } from "../validators/auth/register.validator";
import { TOKENS } from "@di/token";
import { IAuthUsecase } from "@domain/interfaces/usecases/auth/auth.usecase.interface";
import { STATUS_CODE } from "@shared/constants/statusCode";
import { SUCCESS_MESSAGE } from "@shared/constants/messages";
import { emailSchema } from "../validators/auth/email.validator";
import { emailOtpSchema } from "../validators/auth/emailOtp.validator";
import { logger } from "@shared/utils/logger";
import { changePasswordSchema } from "../validators/auth/changePassword.validator";




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

    async registerController(req : Request , res: Response) : Promise<void>{

        const {fullName , email , password} = req.body;

        const result = registerSchema.safeParse({fullName , email , password});
        logger.info(result);
        if(!result.success){
             res.status(400).json({success : false , message : result.error?.issues[0].message});
             return;
        }

        await this._authUseCase.register(result.data)

        res.status(STATUS_CODE.CREATED_201).json({
            success:true,
            message:SUCCESS_MESSAGE.REGISTER_SUCCESS
        });
        return;
    }


    async sentOtpController(req : Request , res : Response) : Promise<void>{

        const {email} = req.body;

        const result = emailSchema.safeParse({email});

        if(!result.success){
            res.status(400).json({success : false , message : result.error?.issues[0].message});
            return;
        }

        await this._authUseCase.sentOtp(result.data.email);

        res.status(STATUS_CODE.OK_200).json({
            success:true,
            message:SUCCESS_MESSAGE.OTP_SENT_SUCCESS
        });
        return;
    }


    async verifyOtpController(req : Request , res : Response) : Promise<void>{

        const {email , otp} = req.body;

        const result = emailOtpSchema.safeParse({email , otp});

        if(!result.success){
            res.status(400).json({success : false , message : result.error?.issues[0].message});
            return;
        }

        await this._authUseCase.verifyOtp(result.data.email,result.data.otp);

        res.status(STATUS_CODE.OK_200).json({
            success:true,
            message:SUCCESS_MESSAGE.OTP_VERIFIED_SUCCESS
        });
        return;
       }


       async sendOtpForForgotPasswordController(req : Request , res : Response) : Promise<void> {

            const {email} = req.body

            const result = emailSchema.safeParse({email})

            if(!result.success){
                res.status(400).json({success : false , message : result.error?.issues[0].message});
                return;
            }

            await this._authUseCase.sentOtpForForgotPassword(result.data.email);

            res.status(STATUS_CODE.OK_200).json({
                success:true,
                message:SUCCESS_MESSAGE.OTP_SENT_SUCCESS
            });
            return;
       }


       async verifyOtpForForgotPasswordController(req : Request , res : Response) : Promise<void> {

            const {email , otp} = req.body;

            const result = emailOtpSchema.safeParse({email , otp});

            if(!result.success){
                res.status(400).json({success : false , message : result.error?.issues[0].message});
                return;
            }

            await this._authUseCase.verifyOtpForForgotPassword(result.data.email,result.data.otp);

            res.status(STATUS_CODE.OK_200).json({
                success:true,
                message:SUCCESS_MESSAGE.OTP_VERIFIED_SUCCESS
            });
            return;
       }

       async forgotPasswordController(req : Request , res : Response) : Promise<void> {


        const {email,newPassword} = req.body


        const result = changePasswordSchema.safeParse({email,newPassword})

        if(!result.success){
            res.status(400).json({success : false , message : result.error?.issues[0].message});
            return;
        }

        await this._authUseCase.forgotPassword(result.data.email,result.data.newPassword);

        res.status(STATUS_CODE.OK_200).json({
            success:true,
            message:SUCCESS_MESSAGE.PASSWORD_CHANGED_SUCCESS
        });
        return;
       }
}