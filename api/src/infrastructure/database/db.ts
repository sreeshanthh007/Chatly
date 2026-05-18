import mongoose from "mongoose";
import { CONFIG } from "../../shared/config";



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
            
            console.log("Database connected");
        } catch (error) {
            console.error("Database connection error", error);
        }
    }

    async disconnect() {
        try {
            await mongoose.disconnect();
            console.log("Database disconnected");
        } catch (error) {
            console.error("Database disconnection error", error);
        }
    }
}