import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/index.js';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRouter.js';

dotenv.config();
const app = express();
await connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// API Routes
app.use('/api/v1/user', userRouter);

app.get("/", (req, res) => {
    res.send("hello");
});

app.listen(process.env.PORT, () => {
    console.log(`Server is connected successfully on port ${process.env.PORT}`);
});
