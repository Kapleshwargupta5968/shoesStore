const jwt = require("jsonwebtoken");
const User = require("../models/user");
exports.authMiddleware = async (req, res, next) => {
    try{
        const token = req.cookies.accessToken || (req.headers.authorization && req.headers.authorization.split(" ")[1]);

        if(!token){
            return res.status(401).json({
                success:false,
                message:"unauthorized, token missing"
            });
        }
        try{
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            const user = await User.findById(decoded.id).select("-password");
            if(!user){
                return res.status(404).json({
                    success:false,
                    message:"user not found"
                });
            }
            req.user = user;
            next();
        }catch(error){
            return res.status(401).json({
                success:false,
                message:"invalid token"
            });
        }
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

exports.authorizeRole = (...roles) => {
    return (req, res, next) => {
        if(!req.user || !req.user.role){
            return res.status(403).json({
                success:false,
                message:"unauthorized, role missing"
            });
        }
        if(!roles.includes(req.user.role)){
            return res.status(403).json({
                success:false,
                message:"unauthorized, role not allowed"
            });
        }
        next();
    };
};