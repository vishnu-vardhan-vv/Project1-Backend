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
        subject: 'Reset Link',
        html: (`<h1>Email Verification</h1>
            <p>Click <a href="${process.env.FRONTEND_URL}/reset-password/${token}">here</a> to verify.</p>`)
    });
};