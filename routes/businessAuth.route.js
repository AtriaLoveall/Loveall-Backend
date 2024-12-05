import { Router } from 'express';
import { businessAuthMiddleware } from "../middleware/isAuthenticated.js";
import businessRegister from '../controllers/business/register.controller.js';
import businessVerifyOtp from '../controllers/business/verifyOtp.controller.js';
import changePassword from '../controllers/business/changePassword.controller.js';
import profileController from '../controllers/business/profile.controller.js';
import businessProfileUpdateController from '../controllers/business/profileUpdate.controller.js';
import businessCreateOfferController from '../controllers/business/createOffer.controller.js';
import businessYourOffersController from '../controllers/business/yourOffers.controller.js';
import businessCheckStoresController from '../controllers/business/checkStores.controller.js';
import BusinessManageManyOffersController from '../controllers/business/manyOffer.controller.js';
import businessProfileHeaderController from '../controllers/business/profileHeader.controller.js';  
import fetchFeedback from '../controllers/business/feedback.controller.js';
import { BusinessTransactionController } from '../controllers/business/transaction.controller.js';

const router = Router();

router.post('/register', businessRegister);
router.post('/verify-otp', businessVerifyOtp);
router.post('/change-password', changePassword);

// Protected Routes
router.post('/profile', businessAuthMiddleware,  profileController);
router.put('/update-profile', businessAuthMiddleware, businessProfileUpdateController);
router.post('/create-offer', businessCreateOfferController);
router.post('/your-offers', businessYourOffersController);
router.get('/check-stores', businessCheckStoresController);
router.get('/manage-many-offers', BusinessManageManyOffersController);
router.get('/profile-header', businessProfileHeaderController);
router.get('/feedback',businessAuthMiddleware, fetchFeedback);
router.post('/transaction',businessAuthMiddleware, BusinessTransactionController);

export default router;
