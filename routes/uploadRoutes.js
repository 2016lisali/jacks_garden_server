import express from "express";
import { verifyTokenAndAdmin } from "../middlewares/verifyToken.js";
import { insertLog } from "../middlewares/logging.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        const { originalname } = file;
        cb(null, originalname);
    },
});

const upload = multer({ storage });
router.post(
    "/",
    verifyTokenAndAdmin,
    insertLog,
    upload.single("productImage"),
    (req, res) => {
        return res.status(200).json("File has been uploaded");
    }
);

export default router;
