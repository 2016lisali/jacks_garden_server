import express from 'express';
import { verifyToken } from '../middlewares/verifyToken.js';
import { insertLog } from '../middlewares/logging.js';

const router = express.Router();

router.delete('/', verifyToken, insertLog, (req, res) => {
  res.status(202).clearCookie("token").json("cookies cleared")
});

export default router;