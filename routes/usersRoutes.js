import express from "express";
import { checkSchema } from "express-validator";
import {
    createUser,
    getAllUsers,
    getUserById,
    getUserBySearch,
    login,
    updateUser,
    deleteUser,
    addEmail,
    getEmailList,
} from "../controllers/userController.js";
import {
    verifyToken,
    verifyTokenAndAuthentication,
    verifyTokenAndAdmin,
} from "../middlewares/verifyToken.js";
import { insertLog } from "../middlewares/logging.js";
import {
    validate,
    addMailingListSchema,
    createUserSchema,
    loginSchema,
    updateUserSchema,
} from "../middlewares/dataValidator.js";

const router = express.Router();

// Admin only routes
router.get("/search", verifyTokenAndAdmin, insertLog, getUserBySearch);
router.get("/emails", verifyTokenAndAdmin, insertLog, getEmailList);
router.get("/", verifyTokenAndAdmin, insertLog, getAllUsers);
router.delete("/:id", verifyTokenAndAdmin, insertLog, deleteUser);

router.get("/:id", verifyTokenAndAuthentication, insertLog, getUserById);
router.post(
    "/register",
    verifyToken,
    insertLog,
    validate(checkSchema(createUserSchema)),
    createUser
);
router.post(
    "/login",
    verifyToken,
    insertLog,
    validate(checkSchema(loginSchema)),
    login
);
router.post(
    "/emails",
    verifyToken,
    insertLog,
    validate(checkSchema(addMailingListSchema)),
    addEmail
);
router.patch(
    "/:id",
    verifyTokenAndAuthentication,
    validate(checkSchema(updateUserSchema)),
    insertLog,
    updateUser
);

export default router;
