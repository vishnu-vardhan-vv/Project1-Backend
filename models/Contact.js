const mongoose=require('mongoose');

const contactSchema=new mongoose.Schema({
    name:String,
    email:{type:String,required:true},
    phone:String,
    topic:String,
    message:{type:String,required:true},
    createdAt:{type:Date,default:Date.now}
});

module.exports=mongoose.model('Contact',contactSchema);