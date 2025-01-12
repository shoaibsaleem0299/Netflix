import express from 'express';
import { Register } from '../controller/user.js'

const router = express.Router();

router.route("/register").post(Register);

export default router;
