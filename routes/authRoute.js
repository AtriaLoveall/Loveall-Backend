import { Router } from 'express';
import businessRegister from '../controllers/BusinessRegister.js';
import businessLogin from '../controllers/BusinessLogin.js';
import businessVerifyOtp from '../controllers/BusinessVerifyOtp.js';
import businessForgetPassword from '../controllers/BForgetPassword.js';
import businessSendOTP from '../controllers/BSendOtp.js';
import manualverify from '../controllers/manualverification.js';
import changePassword from '../controllers/BChangePassword.js';
import businessProfileController from '../controllers/businessProfileController.js';
import businessProfileUpdateController from '../controllers/businessProfileUpdateController.js';
import businessCreateOfferController from '../controllers/businessCreateOfferController.js';
import { authMiddleware } from '../middleware/isAuthenticated.js';

const router = Router();

// Public routes
router.post('/register', businessRegister);
router.post('/login', businessLogin);
router.post('/forget-password', businessForgetPassword);
router.post('/verify-otp', businessVerifyOtp);
router.post('/send-otp', businessSendOTP);

// Protected routes
router.use(authMiddleware);
router.post('/manualverify', manualverify);
router.post('/ChangePass', changePassword);
router.post('/profile', businessProfileController);
router.put('/update-profile', businessProfileUpdateController);
router.post('/create-offer', businessCreateOfferController);

export default router;