import express from "express";
import {
    verifyToken,
    verifyTokenAndAuthentication,
    verifyTokenAndAdmin,
} from "../middlewares/verifyToken.js";
import {
    addCartDetails,
    updateCartDetails,
    getCartDetailsByUserId,
    deleteProductInCart,
    emptyCart,
    createCart,
} from "../controllers/cartController.js";
import { insertLog } from "../middlewares/logging.js";
import { checkSchema } from "express-validator";
import {
    validate,
    createCartSchema,
    createCartDetailsSchema,
} from "../middlewares/dataValidator.js";

const router = express.Router();
router.get(
    "/search",
    verifyTokenAndAuthentication,
    insertLog,
    getCartDetailsByUserId
);
router.post(
    "/details",
    verifyTokenAndAuthentication,
    insertLog,
    validate(checkSchema(createCartDetailsSchema)),
    addCartDetails
);
router.post(
    "/",
    verifyToken,
    insertLog,
    validate(checkSchema(createCartSchema)),
    createCart
);
router.patch(
    "/:id",
    verifyTokenAndAuthentication,
    insertLog,
    validate(checkSchema(createCartDetailsSchema)),
    updateCartDetails
);
router.delete(
    "/:id/product",
    verifyTokenAndAuthentication,
    insertLog,
    deleteProductInCart
);
router.delete("/:id", verifyTokenAndAuthentication, insertLog, emptyCart);

export default router;
