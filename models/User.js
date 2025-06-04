const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    role:{type:String,enum:['Buyer', 'Tenant', 'Owner', 'User', 'Admin', 'Content Creator'],required: true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    isVerified:{type:Boolean,default:false},
    verificationToken: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date
},{ timestamps: true });

module.exports=mongoose.model('User',userSchema);
