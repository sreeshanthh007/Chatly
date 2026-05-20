import { authController } from "@di/controller.resolver";
import { authorizeRole, verifyAuth } from "@presentation/http/middlewares/auth.middleware";
import { API_ENDPOINTS } from "@shared/constants/apiEndpoints";
import { asyncHandler } from "@shared/utils/asyncHandler";
import { BaseRouter } from "../base.route";


export class UserRouter extends BaseRouter {

    constructor(){
        super();
        this.initializeRoutes();
    }

    protected initializeRoutes(): void {
       
        this.router.post(API_ENDPOINTS.USER.USER_LOGOUT,verifyAuth,authorizeRole(["user"]),asyncHandler(authController.logoutController.bind(authController)));
        
    }

}