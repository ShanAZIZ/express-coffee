import mongoose, {Schema, Document} from "mongoose";
import {SessionProps} from "./session.model";

const userSchema = new Schema({
    login: {
        type: Schema.Types.String,
        required: true
    },
    password: {
        type: Schema.Types.String,
        required: true
    },
    sessions: [
        {
            type: Schema.Types.ObjectId,
            ref: "Session"
        }
    ]

}, {
    collection: "users",
    timestamps: true,
    versionKey: false
});

export interface UserProps {
    _id: string;
    login: string;
    password: string;
    sessions: string[] | SessionProps[];
}

export type UserDocument = UserProps & Document;
export const UserModel = mongoose.model("User", userSchema);