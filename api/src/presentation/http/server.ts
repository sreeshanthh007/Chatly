import { Application } from "express";
import express from "express";
import cors from "cors";
import { CONFIG } from "@shared/config";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { rateLimit } from "express-rate-limit";
import { logger } from "@shared/utils/logger";
import { AuthRoute } from "./routes/auth/auth.route";
import { ErrorMiddleware } from "./middlewares/error.middleware";
import { redisClient } from "@infrastructure/cache/redis";
import { UserRouter } from "./routes/user/user.route";

 class Server {

    private App : Application;

    constructor(){
        this.App = express();
        this.initMiddlewares();
        this.initRoutes();
    }


    private initMiddlewares () : void{
       this.App.use(cors({
        origin : CONFIG.CLIENT_URL,
        methods : ["GET","POST","PUT","DELETE","PATCH"],
        credentials : true
       }));

       this.App.use(rateLimit({
        windowMs: 15 * 60 * 1000, 
        max: 100, 
        message: "Too many requests from this IP, please try again after 15 minutes",
       }));
       
        this.App.use(express.json());
        this.App.use(express.urlencoded({extended:true}));
        
        const morganFormat = CONFIG.NODE_ENV === "production" ? "combined" : "dev";
        this.App.use(morgan(morganFormat, {
            stream: {
                write: (message) => logger.http(message.trim()),
            },
        }));

        this.App.use(helmet());
        this.App.use(cookieParser());
    }


    private initRoutes() : void {
        this.App.use("/api/v1/auth",new AuthRoute().router);
        this.App.use("/api/v1/us",new UserRouter().router);
        const errorMiddleware = new ErrorMiddleware();
        this.App.use(errorMiddleware.handleError);
    }


    private initCache() : void {
        redisClient.on("connect", () => {
            logger.info("Redis connected");
        })
    }


    public getApp() : Application{
        return this.App;
    }
    
}

export default Server;
