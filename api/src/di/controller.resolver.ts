import { DependencyInjection } from ".";
import { container } from "tsyringe";
import { AuthController } from "@presentation/http/controllers/auth.controller";



DependencyInjection.registerAllDependencies();


export const authController = container.resolve<AuthController>(AuthController);
