const Contact=require('../models/Contact');
const sendConfirmation=require('../utils/sendConfirmation');
const axios=require('axios');

exports.submitContact=async(req,res)=>{
    const {name,email,phone,topic,message,token}=req.body;

    const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`;
    const response = await axios.post(verifyURL);
    if (!response.data.success) {
        return res.status(400).send('reCAPTCHA verification failed');
    }
    try{
        const contact=await Contact.create({name,email,phone,topic,message});
        await sendConfirmation(email,message,name);
        res.status(201).send('Contact form submitted successfully');
    }
    catch(error){
        console.log('error');
        res.status(500).send(error.message);
    }
}
