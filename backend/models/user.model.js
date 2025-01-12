import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        require: true,
    },
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
}, { timestamps: true });


export const User = mongoose.model('User', userSchema);