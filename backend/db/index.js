import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config({ path: '../env' });

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGO_DB_URI}`);
        console.log(`Database Connected Successfully, Host: ${connection.connection.host}`);
    } catch (error) {
        console.log(`Database Connection Failed ${error}`);
    }
}