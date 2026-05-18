import { ConnectDB } from "./infrastructure/database/db";
import Server from "./infrastructure/http/server";
import { CONFIG } from "./shared/config";




class App{

    private server : Server

    constructor(){
        this.server = new Server();
        
    }

    public async start() : Promise<void>{

        await new ConnectDB().connect()
         this.server.getApp().listen(CONFIG.PORT,()=>{
            console.log(`Server is running on port ${CONFIG.PORT}`);
         });
    }
}

const app = new App()


app.start()
