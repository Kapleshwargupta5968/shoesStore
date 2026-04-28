const User = require("../models/user");
const bcrypt = require("bcrypt");
const { generateAccessToken, generateRefreshToken } = require("../utils/generateToken");

exports.signUp = async (req, res) => {
    try{
        const {name, email, password, role} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            });
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already exists"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        const userResponse = user.toObject();
        delete userResponse.password;

        const payload = {
            id: user._id,
            email: user.email,
            role: user.role
        };
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" ? "none":"lax",
            sameSite: process.env.NODE_ENV === "production" ? "strict":"lax",
            maxAge: 15 * 60 * 1000
        });

       return res.status(201).json({
            success:true,
            refreshToken,
            user: userResponse
        });
        
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};


exports.signIn = async (req, res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            });
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({
                success:false,
                message:"Invalid credentials"
            });
        }

        const payload = {
            id: user._id,
            email: user.email,
            role: user.role
        };
        
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" ? "none":"lax",
            sameSite: process.env.NODE_ENV === "production" ? "strict":"lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(200).json({
            success:true,
            refreshToken,
            user: userResponse,
            message: "Login successful"
        });
        
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

exports.logout = async (req,res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken){
            return res.status(401).json({
                success:false,
                message:"No refresh Token found"
            });
        }

        const decodedToken = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET);
        if(!decodedToken){
            return res.status(401).json({
                success:false,
                message:"Invalid refresh Token"
            });
        }

        const user = await User.findById(decodedToken.id);
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }

        return res.clearCookie("refreshToken").status(200).json({
            success:true,
            message:"Logout successful"
        });
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

exports.getProfile = async (req,res) => {
    try {
        const user = await User.findById(req.user._id);
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }
        const userResponse = user.toObject();
        delete userResponse.password;

        return res.status(200).json({
            success:true,
            user: userResponse,
            message: "Profile fetched successfully"
        });
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

exports.refreshAccessToken = async (req, res) => {
    try{
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken){
            return res.status(401).json({
                success:false,
                message:"No refresh Token found"
            });
        }

        const decodedToken = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET);
        if(!decodedToken){
            return res.status(401).json({
                success:false,
                message:"Invalid refresh Token"
            })
        }

        const user = await User.findById(decodedToken.id)
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }

        const payload = {
            id: user._id,
            email: user.email,
            role: user.role
        };
        const newAccessToken = generateAccessToken(payload);
    

        res.cookie("accessToken",newAccessToken,{
            httpOnly:true,
            secure: process.env.NODE_ENV === "production" ? "none":"lax",
            sameSite: process.env.NODE_ENV === "production" ? "strict":"lax",
            maxAge: 15 * 60 * 1000
        });

        const userResponse = user.toObject();
        delete userResponse.password;
        
        return res.status(200).json({
            success:true,
            user: userResponse,
            message:"Access Token generated successfully"
        });
        
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};