
import dotenv from "dotenv";

dotenv.config();

export const CONFIG = {

    PORT : Number(process.env.PORT),
    NODE_ENV : process.env.NODE_ENV!,
    MONGO_URI : process.env.MONGO_URI,
    CLIENT_URL : process.env.CLIENT_URL!,  
    SALT_ROUNDS : Number(process.env.SALT_ROUNDS!), 
    JWT_SECRET_KEY : process.env.JWT_SECRET_KEY!,
    ACCESS_EXPIRES_IN : process.env.ACCESS_EXPIRES_IN!,
    REFRESH_EXPIRES_IN: process.env.REFRESH_EXPIRES_IN!,
    REDIS_HOST: process.env.REDIS_HOST!,
    REDIS_PORT: Number(process.env.REDIS_PORT),
}