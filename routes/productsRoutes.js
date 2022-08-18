import {
    createProduct,
    getAllProducts,
    getProductById,
    getProductAndOrderStat,
    getProductBySearch,
    deleteProduct,
    updateProduct,
} from "../controllers/productController.js";
import {
    verifyToken,
    verifyTokenAndAdmin,
} from "../middlewares/verifyToken.js";
import { insertLog } from "../middlewares/logging.js";
import express from "express";
import { checkSchema } from "express-validator";
import {
    validate,
    createAndUpdateProductSchema,
} from "../middlewares/dataValidator.js";

const router = express.Router();

router.get("/search", verifyToken, insertLog, getProductBySearch);
router.get("/summary", verifyTokenAndAdmin, insertLog, getProductAndOrderStat);
router.get("/", verifyToken, insertLog, getAllProducts);
router.get("/:id", verifyToken, insertLog, getProductById);
router.post(
    "/",
    verifyTokenAndAdmin,
    insertLog,
    validate(checkSchema(createAndUpdateProductSchema)),
    createProduct
);
router.patch(
    "/:id",
    verifyTokenAndAdmin,
    insertLog,
    validate(checkSchema(createAndUpdateProductSchema)),
    updateProduct
);
router.delete("/:id", verifyTokenAndAdmin, insertLog, deleteProduct);

export default router;
