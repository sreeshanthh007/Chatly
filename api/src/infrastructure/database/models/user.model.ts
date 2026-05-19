import { User } from "@domain/entities/User";
import mongoose, { model } from "mongoose";
import { UserSchema } from "../schema/user.schema";




export interface IUserModel extends Omit<User , "_id"> {
    _id:mongoose.Schema.Types.ObjectId;
}



export const UserModel = model<IUserModel>("user",UserSchema)