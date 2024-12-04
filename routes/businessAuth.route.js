import { Router } from 'express';
import { businessAuthMiddleware } from "../middleware/isAuthenticated.js";
import businessRegister from '../controllers/business/BusinessRegister.js';
import businessVerifyOtp from '../controllers/business/BusinessVerifyOtp.js';
import businessForgetPassword from '../controllers/business/BForgetPassword.js';
import businessSendOTP from '../controllers/business/BSendOtp.js';
import changePassword from '../controllers/business/BChangePassword.js';
import businessProfileController from '../controllers/business/BusinessProfileController.js';
import businessProfileUpdateController from '../controllers/business/BusinessProfileUpdateController.js';
import businessCreateOfferController from '../controllers/business/BusinessCreateOfferController.js';
import businessYourOffersController from '../controllers/business/BusinessYourOffersController.js';
import businessCheckStoresController from '../controllers/business/BusinessCheckStoresController.js';
import BusinessManageManyOffersController from '../controllers/business/BusinessManyOfferController.js';
import businessProfileHeaderController from '../controllers/business/BusinessProfileHeaderController.js';  
import fetchFeedback from '../controllers/business/BFeedback.controller.js';
import { BusinessTransactionController } from '../controllers/business/BTransaction.controller.js';

const router = Router();

router.post('/register', businessRegister);
router.post('/forget-password', businessForgetPassword);
router.post('/verify-otp', businessVerifyOtp);
router.post('/send-otp', businessSendOTP);
router.post('/change-password', changePassword);
router.post('/profile', businessProfileController);
router.put('/update-profile', businessProfileUpdateController);
router.post('/create-offer', businessCreateOfferController);
router.post('/your-offers', businessYourOffersController);
router.get('/check-stores', businessCheckStoresController);
router.get('/manage-many-offers', BusinessManageManyOffersController);
router.get('/profile-header', businessProfileHeaderController);
router.get('/feedback',businessAuthMiddleware, fetchFeedback);
router.post('/transaction',businessAuthMiddleware, BusinessTransactionController);

export default router;
