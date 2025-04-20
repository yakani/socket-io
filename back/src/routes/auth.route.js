
import express from 'express';
import  protect  from '../lib/token.js'; // Fixed typo in folder name
import { checkuser, Login, logout, Register, Uploadpic } from '../contollers/auth.controller.js'; // Fixed typo in folder name
const router = express.Router();
router.post('/signup', Register);
router.post('/login', Login);
router.post('/logout',logout);
router.put('/avatar',protect,Uploadpic);
router.get('/check',protect,checkuser);
export default router;