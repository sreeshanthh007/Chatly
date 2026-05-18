
import dotenv from "dotenv";

dotenv.config();

export const CONFIG = {

    PORT : Number(process.env.PORT),
    NODE_ENV : process.env.NODE_ENV!,
    MONGO_URI : process.env.MONGO_URI,
    CLIENT_URL : process.env.CLIENT_URL!
    
}