import { IBcryptService } from "@domain/interfaces/services/bcrypt.service.interface";
import { CONFIG } from "@shared/config";
import bcrypt from "bcryptjs"


export class BcryptService implements IBcryptService {
   
    hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, CONFIG.SALT_ROUNDS);
    }

    comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }
}