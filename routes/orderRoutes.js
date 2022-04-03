import express from 'express';
import { createOrder, createOrderDetails, getOrderDetails, getAllOrders } from "../controllers/orderControllers.js";
import { verifyToken, verifyTokenAndAuthentication, verifyTokenAndAdmin } from '../middlewares/verifyToken.js';
import { insertLog } from '../middlewares/logging.js';

const router = express.Router();

router.get("/:id", verifyTokenAndAuthentication, insertLog, getOrderDetails)
router.get("/", verifyTokenAndAdmin, insertLog, getAllOrders)
router.post("/", verifyTokenAndAuthentication, insertLog, createOrder);
router.post("/details", verifyTokenAndAuthentication, insertLog, createOrderDetails);


export default router;


