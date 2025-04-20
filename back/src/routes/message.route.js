import express from 'express';
import  protect  from '../lib/token.js'; 
import { getMessage, getUser, sendMessage } from '../contollers/message.controller.js';
const router = express.Router();
router.get("/user",protect,getUser);
router.get("/:id",protect,getMessage);
router.post("/:id",protect,sendMessage);

export default router;