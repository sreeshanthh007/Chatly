import { IUserRepository } from "@domain/interfaces/repositories/user.repository.interface";
import { container } from "tsyringe";
import { TOKENS } from "./token";
import { UserRepository } from "@infrastructure/repositories/user.repository";



export class RepositoryRegistry {
 
    static registerRepositories() : void{

     
        container.registerSingleton<IUserRepository>(TOKENS.UserRepository , UserRepository)
    }

}