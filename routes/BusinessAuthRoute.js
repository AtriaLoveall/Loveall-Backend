import { Router } from 'express';
import businessRegister from '../controllers/BusinessRegister.js';
import businessLogin from '../controllers/BusinessLogin.js';
import businessVerifyOtp from '../controllers/BusinessVerifyOtp.js';
import businessForgetPassword from '../controllers/BForgetPassword.js';
import businessSendOTP from '../controllers/BSendOtp.js';
import manualverify from '../controllers/manualverification.js';
import changePassword from '../controllers/BChangePassword.js';
import { getBusinessProfile, updateBusinessProfile } from '../controllers/businessProfileController.js';

const router = Router();

router.post('/register', businessRegister);
router.post('/login', businessLogin);
router.post('/forget-password', businessForgetPassword);
router.post('/verify-otp', businessVerifyOtp);
router.post('/send-otp', businessSendOTP);
router.post('/manualverify', manualverify);
router.post('/ChangePass', changePassword);
router.get('/profile', getBusinessProfile);
router.put('/profile', updateBusinessProfile); // Add this line

export default router;