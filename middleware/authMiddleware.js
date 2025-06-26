const jwt=require('jsonwebtoken');
const User=require('../models/User');

const protect=async(req,res,next)=>{
    const token=req.cookies.token;

    if(!token) return res.status(401).send('Not authorized, no token' );

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=await User.findById(decoded.id).select('-password');
        next();
    }
    catch(error){
        res.status(401).json('Not authorized, invalid token' );
    }
}

const contentCreatorOnly=(req,res,next)=>{
    if(req.user?.role!=='Content Creator'){
        return res.status(403).send('Access denied: content creator only' );
    }
    next();
}

module.exports = { protect, contentCreatorOnly };


