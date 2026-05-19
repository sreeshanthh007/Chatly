import "reflect-metadata"
import { ConnectDB } from "@infrastructure/database/db";
import Server from "@presentation/http/server";
import { CONFIG } from "@shared/config";
import { logger } from "@shared/utils/logger";




class App{

    private server : Server

    constructor(){
        this.server = new Server();
        
    }

    public async start() : Promise<void>{

        await new ConnectDB().connect()
         this.server.getApp().listen(CONFIG.PORT,()=>{
            logger.info(`Server is running on port ${CONFIG.PORT}`);
         });
    }
}

const app = new App()


app.start()
