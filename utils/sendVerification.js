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
        html: (`<h1>Email Verification</h1>
            <p>Click <a href="${process.env.BACKEND_URL}/api/auth/verify/${token}">here</a> to verify.</p>`)
    });
};
