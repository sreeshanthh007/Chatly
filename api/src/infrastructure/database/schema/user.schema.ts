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
        sparse:true,
        trim:true,
    },

    role : {
        type : String,
        required : true,
        enum : ['admin','user'],
        default : 'user'
    },

    profileImage : {
        type : String,
        default:null
    },

    password : {
        type : String,
    },
    
    authProvider: {
        type: String,
        enum: ['local', 'google'],
        default: 'local'
    }

},{timestamps:true})