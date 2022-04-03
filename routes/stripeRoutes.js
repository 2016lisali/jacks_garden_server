import express from 'express';
import { makePayment } from "../controllers/stripeController.js"
import { verifyTokenAndAuthentication } from '../middlewares/verifyToken.js';
import { insertLog } from '../middlewares/logging.js';

const router = express.Router()

router.post("/payment", verifyTokenAndAuthentication, insertLog, makePayment);

export default router;
