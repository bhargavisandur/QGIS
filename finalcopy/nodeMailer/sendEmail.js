const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'noabuseapp@gmail.com',
        pass: 'noabuse123',
    },
    tls: {
        rejectUnauthorized: false,
    },
});

module.exports = function sendEmail(to, subject, message) {
    const mailOptions = {
        from: 'noabuseapp@gmail.com',
        to,
        subject,
        html: message, //'<h1>Thank you for using the NoAbuse App and helping another child!</h1><h3>To know more about the child that you reported and to join our amazing community, click the link below</h3><a href="https://localhost:3000/userRegister">Register Now!</a>'
    };

    transport.sendMail(mailOptions, (error) => {
        if (error) {
            console.log(error);
        }
    });
};
