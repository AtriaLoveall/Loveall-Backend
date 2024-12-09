import { Router } from "express";
import manualVerifyBusiness from "../controllers/admin/ManualVerification.js";


const router = Router();
router.post('/manual-verification', manualVerifyBusiness);

export default router;

