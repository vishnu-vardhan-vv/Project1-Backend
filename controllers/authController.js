const User=require('../models/User');
const validatePassword=require('../middleware/validatePassword');
const bcrypt=require('bcryptjs');
const crypto=require('crypto');
const jwt=require('jsonwebtoken');
const sendVerification=require('../utils/sendVerification');
const sendResetLink=require('../utils/sendResetLink');


exports.register=async(req,res)=>{
    const {email,password,role}=req.body;
    if(!validatePassword(password)){
        return res.status(400).send('Weak Password');
    }
    try{
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).send('Email already exists');
        }
        const hashedPassword=await bcrypt.hash(password,12);
        const token=crypto.randomBytes(32).toString('hex');
        const user=await User.create({email, password:hashedPassword,role, verificationToken:token});
        await sendVerification(email,token);
        res.status(201).send('Registered, Please verify your email');
    }
    // catch(error){
    //     res.status(500).send('Server error');
    // }
    catch (error) {
    console.error('Backend Error:', error); // Logs actual error in terminal
    res.status(500).send(error.message);
  }
}

exports.verifyEmail=async (req,res)=>{
    const {token}=req.params;
    try{
        const user=await User.findOne({verificationToken:token});
        if(!user){
            return res.status(400).send('Invalid token');
        }
        user.isVerified=true;
        user.verificationToken=undefined;
        await user.save();
        res.send('Email verified successfully');
    }
    catch(error){
        res.status(500).send('Server error');
    }
}

exports.login=async (req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).send('Invalid credentials');
        }
        if(!user.isVerified){
            return res.status(403).send('Email is not verified');
        }
        const matched=await bcrypt.compare(password,user.password);
        if(!matched){
            return res.status(400).send('Invalid credentials');
        }
        const token=jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:'1h'});
        res.cookie('token',token,{httpOnly:true,secure:true}).send('Logged in');
    }
    catch(error){
        res.status(500).send('Server error');
    }

}

exports.forgotPassword=async(req,res)=>{
    const {email}=req.body;
    try{
        const user=await User.findOne({email});
        if(!user){
            return res.status(404).send('User not found');
        }
        const token=crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken=token;
        user.resetPasswordExpires=Date.now()+3600000;
        await user.save();
        await sendResetLink(email,token);
        res.send('Password reset email sent');
    }
    catch(error){
        res.status(500).send('Server error');
    }
}

exports.resetPassword=async(req,res)=>{
    const {password}=req.body;
    const {token}=req.params;
    if(!validatePassword(password)){
        return res.status(400).send('Weak password');
    }
    try{
         const user=await User.findOne({resetPasswordToken:token,resetPasswordExpires: { $gt: Date.now() }});
        if(!user){
            return res.status(400).send('Invalid or expired token');
        }
        user.password=await bcrypt.hash(password,12);
        user.resetPasswordToken=undefined;
        user.resetPasswordExpires=undefined;
        await user.save();
        res.send('Password has been reset successfully');
    }
    catch(error){
        res.status(500).send('Server error');
    }
}
