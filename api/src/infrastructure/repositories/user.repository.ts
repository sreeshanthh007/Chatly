import { User } from "@domain/entities/User";
import { IUserRepository } from "@domain/interfaces/repositories/user.repository.interface";
import { UserModel } from "@infrastructure/database/models/user.model";


export class UserRepository implements IUserRepository {
    
    findByEmail(email: string): Promise<User | null> {
       return UserModel.findOne({email})
    } 
}