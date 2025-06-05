const nodemailer = require('nodemailer');

module.exports = async function(to, token) {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS
        }
    });

    await transporter.sendMail({
        to,
        subject: 'Verify Your Email',
        // html: (`<h1>Email Verification</h1>
        //     <p>Click <a href="http://localhost:5000/api/auth/verify/${token}">here</a> to verify.</p>`)
        html: (`<h1>Email Verification</h1>
            <p>Click <a href="https://project1-backend-95xl.onrender.com/api/auth/verify/${token}">here</a> to verify.</p>`)
    });
};
