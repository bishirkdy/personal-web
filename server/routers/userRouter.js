import express from 'express';
import { deleteUser, editUser, getUser, loginUser, registerUser, resendOtp, verifyMail } from '../controllers/userController.js';
import { authenticateUser, authorizeAdmin } from '../middleware/authenticateUser.js';

const router = express.Router();

router.post('/register' , registerUser)
router.post('/verify-user' , verifyMail)
router.post('/resend-otp' , resendOtp)
router.post('/login' , loginUser)
router.get('/users' , authenticateUser , authorizeAdmin , getUser)
router.patch('/update-user/:id' , authenticateUser , authorizeAdmin , editUser )
router.delete('/delete-user' , authenticateUser , authorizeAdmin , deleteUser )

export default router;