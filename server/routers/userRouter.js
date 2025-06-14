import express from 'express';
import { loginUser, registerUser, resendOtp, verifyMail } from '../controllers/userController.js';

const router = express.Router();

router.post('/register' , registerUser)
router.post('/verify-user' , verifyMail)
router.post('/resend-otp' , resendOtp)
router.post('/login' , loginUser)

export default router;