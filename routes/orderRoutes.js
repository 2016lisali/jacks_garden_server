import express from 'express';
import { createOrder, createOrderDetails, createOrderBillingDetails, getOrderDetails, getAllOrders, getOrderBillingDetails } from "../controllers/orderControllers.js";
import { verifyToken, verifyTokenAndAuthentication, verifyTokenAndAdmin } from '../middlewares/verifyToken.js';
import { insertLog } from '../middlewares/logging.js';

const router = express.Router();

router.get("/billings/:id", verifyTokenAndAdmin, insertLog, getOrderBillingDetails)
router.get("/:id", verifyTokenAndAuthentication, insertLog, getOrderDetails)
router.get("/", verifyTokenAndAdmin, insertLog, getAllOrders)
router.post("/", verifyTokenAndAuthentication, insertLog, createOrder);
router.post("/billings", verifyTokenAndAuthentication, insertLog, createOrderBillingDetails);
router.post("/details", verifyTokenAndAuthentication, insertLog, createOrderDetails);


export default router;


