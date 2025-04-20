import express from 'express';
import dotenv from 'dotenv';
import connetedDB from './lib/Database.config.js';
import { errorhandeler, notfound } from './midleware/handle.error.js';
import authroute from './routes/auth.route.js';
import messageroute from './routes/message.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { app ,server } from './lib/socket.js';
dotenv.config();
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
connetedDB();
app.use('/api/auth', authroute);
app.use('/api/message',messageroute);
app.use(errorhandeler);
app.use(notfound);
server.listen(3000, () => {
  console.log('Server is running on port 3000');
});