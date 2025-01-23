import mongoose, { Schema, model, Document } from "mongoose";

import { Tag } from "./Tag"
import { Role } from "./Role"
import { Position } from "./Positions"
import { Article } from "./Article"

// Defining the interface for the model
export interface User extends Document{
    id: String; // TODO: Need to write a thing to assing a id for each user
    username: String;
    name: String;
    email: String;
    tags: Tag[];
    password: String; // Hashed Password
    role: Role;
    position?: Position;
    rollNumber?: Number;
    articles: Article[];
    verifyCode: String; 
    verifyCodeExpiry: Date;
    createdAt: Date;
}

const UserSchema: Schema<User> = new Schema({
    id : {
        type: String,
        required: [true, "username is required"],
        trim: true,
        unique: true,
    }
    
})

