import express from 'express';
import { verifyToken, verifyTokenAndAuthentication, verifyTokenAndAdmin } from '../middlewares/verifyToken.js';
import { addCartDetails, updateCartDetails, getCartDetailsByUserId, deleteProductInCart, emptyCart, createCart } from "../controllers/cartController.js";
import { insertLog } from '../middlewares/logging.js';

const router = express.Router()
router.get("/search", verifyTokenAndAuthentication, insertLog, getCartDetailsByUserId);
// router.get("/", verifyTokenAndAuthentication, insertLog, getCartIdByUserId)
// router.get("/:id", verifyTokenAndAuthentication, insertLog, getCartDetailsById)

router.post("/details", verifyTokenAndAuthentication, insertLog, addCartDetails)
router.post("/", verifyToken, insertLog, createCart);
router.patch("/:id", verifyTokenAndAuthentication, insertLog, updateCartDetails)
router.delete("/:id/product", verifyTokenAndAuthentication, insertLog, deleteProductInCart)
router.delete("/:id", verifyTokenAndAuthentication, insertLog, emptyCart)

export default router;


