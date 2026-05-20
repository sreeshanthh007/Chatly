import { User } from "@domain/entities/User";


export interface IUserRepository {

create(data:User) : Promise<void>

 findByEmail : (email : string) => Promise<User | null>;   

 findById : (id : string) => Promise<User | null>;

 findByIdAndChangePassword : (id : string, newPassword : string) => Promise<void>;
}