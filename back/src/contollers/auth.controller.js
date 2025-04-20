import User from "../models/user.model.js";
import asyncHandler from "express-async-handler";
import generatetoken from "../lib/generate.token.js";
import cloudinary from "../lib/cloudinary.config.js";
export const Login = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: 'Please add all fields' });
            return;
        }
        const user = await User.findOne({ email });
        if (user && (await user.matchPasswords(password))) {
            generatetoken(res, user._id);
            res.json({
               msg:"Login successfully",
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});
export const Register = asyncHandler(async (req, res) => {
    try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400).json({ message: 'Please add all fields' });
        return;
    }
    if(password.length < 6) {
        res.status(400).json({ message: 'Password must be at least 6 characters' });
        return;
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
        res.status(400).json({ message: 'User already exists' });
        return;
    }
    const user = await User.create({
        name,
        email,
        password,
    });
    if (user) {
        generatetoken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    } } catch (error) {
        res.status(500)
        throw new Error(error.message);
    }
});
export const logout=asyncHandler(async (req,res)=>{
    try {
        
    
    res.cookie('jwt','',{
        maxAge:0
    });
    res.cookie('refresh','',{
        maxAge:0
    });
     res.status(200).json({msg:'ok'});
} catch (error) {
    res.status(500).json({ message: error.message });
    
}


});
export  const Uploadpic = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const {pic } = req.body;
        if (!pic) {
            res.status(400).json({ message: 'No file uploaded' });
            return;
        }
        const result = await cloudinary.uploader.upload(pic, {
            folder: 'uploads',
            width: 150,
            crop: 'scale',
        });
        user.pic = result.secure_url;
        await user.save();
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
export const checkuser = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
