import express from 'express';
import {
  createOrder, createOrderDetails, createOrderBillingDetails, deleteOrder, getOrderDetails, getAllOrders,
  getOrderBillingDetails, updateOrderStatus, getOrdersByUserId, getOrderSummary
} from "../controllers/orderControllers.js";
import { verifyTokenAndAuthentication, verifyTokenAndAdmin } from '../middlewares/verifyToken.js';
import { insertLog } from '../middlewares/logging.js';

const router = express.Router();

router.get("/billings/:id", verifyTokenAndAdmin, insertLog, getOrderBillingDetails)
router.get("/users/:id", verifyTokenAndAuthentication, insertLog, getOrdersByUserId)
router.get("/summary", verifyTokenAndAdmin, insertLog, getOrderSummary);
router.get("/:id", verifyTokenAndAuthentication, insertLog, getOrderDetails)
router.get("/", verifyTokenAndAdmin, insertLog, getAllOrders)
router.post("/", verifyTokenAndAuthentication, insertLog, createOrder);
router.post("/billings", verifyTokenAndAuthentication, insertLog, createOrderBillingDetails);
router.post("/details", verifyTokenAndAuthentication, insertLog, createOrderDetails);
router.patch("/:id", verifyTokenAndAdmin, insertLog, updateOrderStatus);
router.delete("/:id", verifyTokenAndAdmin, insertLog, deleteOrder)


export default router;


