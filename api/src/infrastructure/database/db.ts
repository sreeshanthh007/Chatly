import mongoose from "mongoose";
import { CONFIG } from "@shared/config";
import { logger } from "@shared/utils/logger";

export class ConnectDB {

    private  _dbUrl : string

    constructor() {
     this._dbUrl = CONFIG.MONGO_URI!;

    }

    async connect() {
        try {
           await mongoose.connect(this._dbUrl,{
				maxPoolSize:10,
				minPoolSize:5,
				serverSelectionTimeoutMS: 5000,
				socketTimeoutMS: 45000,
			});
            
            logger.info("Database connected");
        } catch (error) {
            logger.error("Database connection error", error as Error);
        }
    }

    async disconnect() {
        try {
            await mongoose.disconnect();
            logger.info("Database disconnected");
        } catch (error) {
            logger.error("Database disconnection error", error as Error);
        }
    }
}