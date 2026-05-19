import { API_ENDPOINTS } from "@shared/constants/apiEndpoints";
import { BaseRouter } from "../base.route";
import { asyncHandler } from "@shared/utils/asyncHandler";
import { authController } from "@di/controller.resolver";



export class AuthRoute extends BaseRouter {
    
    constructor(){
        super();


        
    }
    protected initializeRoutes(): void {
        this.router.post(API_ENDPOINTS.AUTH.LOGIN,asyncHandler(authController.loginController.bind(authController)))
        // this.router.post(API_ENDPOINTS.AUTH.REGISTER,asyncHandler(authController.registerController.bind(authController)))
    }
}