import { createProduct, getAllProducts, getProductById, getProductBySearch, deleteProduct, updateProduct } from '../controllers/productController.js';
import { verifyToken, verifyTokenAndAdmin } from '../middlewares/verifyToken.js';
import { insertLog } from '../middlewares/logging.js';
import express from 'express';

const router = express.Router();

router.get("/search", verifyToken, insertLog, getProductBySearch);
router.get("/", verifyToken, insertLog, getAllProducts);
router.get("/:id", verifyToken, insertLog, getProductById);
router.post("/", verifyTokenAndAdmin, insertLog, createProduct);
router.patch("/:id", verifyTokenAndAdmin, insertLog, updateProduct);
router.delete("/:id", verifyTokenAndAdmin, insertLog, deleteProduct);


export default router;