import express from "express";
import { checkSchema } from "express-validator";

import {
    verifyToken,
    verifyTokenAndAuthentication,
} from "../middlewares/verifyToken.js";
import { insertLog } from "../middlewares/logging.js";
import {
    validate,
    createCartSchema,
    createCartDetailsSchema,
} from "../middlewares/dataValidator.js";
import {
    addCartDetails,
    updateCartDetails,
    getCartDetailsByUserId,
    deleteProductInCart,
    emptyCart,
    createCart,
} from "../controllers/cartController.js";

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
