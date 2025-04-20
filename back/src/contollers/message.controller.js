import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.config.js";
import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import { getusersocketid, io } from "../lib/socket.js";
export const getUser = asyncHandler(async(req ,res)=>{

    try {
        const users = await User.find({_id :{$ne:req.user._id}}).select("-password");
        if(!users) {
            res.status(404).json({message:"No users found"});
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message:error.message});
        
    }
});

export const getMessage = asyncHandler(async(req ,res)=>{
    try {
        const messages = await Message.find({
            $or:[
                {
                    senderId :req.user._id,
                    receiverId: req.params.id,
                },
                {
                    senderId:req.params.id,
                    receiverId:req.user._id,
                },
            ],
        }).sort({createdAt:1});
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({message:error.message});
        
    }
});
export const sendMessage = asyncHandler(async(req ,res)=>{
    try {
        const {Text, image} = req.body;
        let fileUrl ="";
        if(image) {
            const fileStr = image;
            const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
                folder: 'uploads',
                width: 150,
                crop: 'scale',
            });
            fileUrl = uploadedResponse.url;
        }
        const message = await Message.create({
            senderId:req.user._id,
            receiverId:req.params.id,
            Text,
            Image:fileUrl,
        });
        const receverid = getusersocketid(req.params.id);
        if(receverid){
            io.to(receverid).emit("msg",message);
        }
        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({message:error.message});
        console.log(error);
    }
});
