const nodemailer=require('nodemailer');

module.exports=async function(email,message,name){
    const transpoter=nodemailer.createTransport({
        service:'Gmail',
        auth:{
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS
        }
    });

    await transpoter.sendMail({
        from:process.env.EMAIL,
        to:email,
        subject:'We received your message.',
        text:`Hi ${name || "there"},\n\nThanks for reaching out. We'll get back to you soon.\n\nYour Message: ${message}`
    });
}