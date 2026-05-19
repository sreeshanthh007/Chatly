import mongoose from "mongoose";
import { IUserModel } from "../models/user.model";


export const UserSchema = new mongoose.Schema <IUserModel>({

    fullName : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true,
        
    },

    userName : {
        type : String,
        unique : true,
        default:null
    },

    profileImage : {
        type : String,
        default:null
    },

    password : {
        type : String,
    },

},{timestamps:true})