import { User } from '../models/user.model.js'

export const Register = async (req, res) => {
    const { fullname, username, email, password } = req.body;
    try {
        if (!fullname || !username || !email || !password) {
            return res.status(401).json({
                message: "All field is required",
                status: false
            })
        }

        const user = await User.findOne({ email })

        if (user) {
            return res.status(401).json({
                message: "User already exist",
                status: false
            })
        }

        await User.create({
            fullname, username, email, password
        });

        return res.status(401).json({
            message: "Account create successfully",
            status: true
        })

    } catch (error) {
        console.log(`error while creating account ${error}`);
    }
}