import { API_ENDPOINTS } from "@shared/constants/apiEndpoints";
import { BaseRouter } from "../base.route";
import { asyncHandler } from "@shared/utils/asyncHandler";
import { authController } from "@di/controller.resolver";



export class AuthRoute extends BaseRouter {
    
    constructor(){
        super();


        
    }
    protected initializeRoutes(): void {
        this.router.post(API_ENDPOINTS.AUTH.LOGIN,asyncHandler(authController.loginController.bind(authController)));
        this.router.post(API_ENDPOINTS.AUTH.REGISTER,asyncHandler(authController.registerController.bind(authController)));
        this.router.post(API_ENDPOINTS.AUTH.SENT_OTP,asyncHandler(authController.sentOtpController.bind(authController)));
        this.router.post(API_ENDPOINTS.AUTH.VERIFY_OTP,asyncHandler(authController.verifyOtpController.bind(authController)));
        this.router.post(API_ENDPOINTS.AUTH.SENT_OTP_FOR_FORGOT_PASSWORD,asyncHandler(authController.sendOtpForForgotPasswordController.bind(authController)));
        this.router.post(API_ENDPOINTS.AUTH.VERIFY_OTP_FOR_FORGOT_PASSWORD,asyncHandler(authController.verifyOtpForForgotPasswordController.bind(authController)));
        this.router.patch(API_ENDPOINTS.AUTH.FORGOT_PASSWORD,asyncHandler(authController.forgotPasswordController.bind(authController)));
    }
}