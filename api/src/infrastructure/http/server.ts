import { Application } from "express";
import express from "express";
import cors from "cors";
import { CONFIG } from "../../shared/config";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

 class Server {

    private App : Application;

    constructor(){
        this.App = express();
        this.initMiddlewares();

    }


    private initMiddlewares () : void{
       this.App.use(cors({
        origin : CONFIG.CLIENT_URL,
        methods : ["GET","POST","PUT","DELETE","PATCH"],
        credentials : true
       }));
        this.App.use(express.json());
        this.App.use(express.urlencoded({extended:true}));
        this.App.use(morgan("dev"));
        this.App.use(helmet());
        this.App.use(cookieParser());
    }


    public getApp() : Application{
        return this.App;
    }
    
}

export default Server;
