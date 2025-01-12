import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js'
import bcryptjs from 'bcryptjs'

export const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(401).json({
                message: "Email and Password is required",
                success: false

            })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(401).json({

                message: "User Not Found",
                success: false

            })
        }

        const matchedPassword = await bcryptjs.compare(password, user.password);

        if (!matchedPassword) {
            return res.status(401).json({
                message: "Password is incorrect",
                success: false

            })
        }

        const tokenData = {
            id: user._id
        }

        const token = await jwt.sign(tokenData, "asdfghjkl123456789asdf");

        return res.status(200).json({
            success: true,
            message: "Login Successfully",
            token: token,
            username: user.username,
            fullname: user.fullname,
            email: user.email,

        })

    } catch (error) {
        console.log(`failed to login ${error}`);
    }
}


export const Register = async (req, res) => {
    const { fullname, username, email, password } = req.body;
    try {
        if (!fullname || !username || !email || !password) {
            return res.status(401).json({
                message: "All field is required",
                success: false
            })
        }

        const user = await User.findOne({ email })

        if (user) {
            return res.status(401).json({
                message: "User already exist",
                success: false
            })
        }

        const hashedPassword = await bcryptjs.hash(password, 16);

        await User.create({
            fullname, username, email, password: hashedPassword
        });

        return res.status(200).json({
            message: "Account create successfully",
            success: true
        })

    } catch (error) {
        console.log(`error while creating account ${error}`);
    }
}