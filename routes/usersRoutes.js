import express from 'express';
import { createUser, getAllUsers, getUserById, getUserBySearch, login, updateUser, deleteUser } from '../controllers/userController.js';
import { verifyToken, verifyTokenAndAuthentication, verifyTokenAndAdmin } from '../middlewares/verifyToken.js';
import { insertLog } from '../middlewares/logging.js';
const router = express.Router()

router.get('/search', verifyTokenAndAdmin, insertLog, getUserBySearch);
router.post('/register', verifyToken, insertLog, createUser);
router.post('/login', verifyToken, insertLog, login)
router.get('/', verifyTokenAndAdmin, insertLog, getAllUsers);
router.get('/:id', verifyTokenAndAdmin, insertLog, getUserById);
router.patch('/:id', verifyTokenAndAuthentication, insertLog, updateUser);
// ??? can users delete their own account?
router.delete('/:id', verifyTokenAndAdmin, insertLog, deleteUser);

export default router;