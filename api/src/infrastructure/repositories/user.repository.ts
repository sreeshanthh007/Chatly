import { User } from "@domain/entities/User";
import { IUserRepository } from "@domain/interfaces/repositories/user.repository.interface";
import { UserModel } from "@infrastructure/database/models/user.model";


export class UserRepository implements IUserRepository {
    

    async create(data: Omit<User,'_id'>): Promise<void> {
       await UserModel.create(data)
    }

    findByEmail(email: string): Promise<User | null> {
       return UserModel.findOne({email})
    } 
}