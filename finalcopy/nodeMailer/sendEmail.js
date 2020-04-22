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

module.exports = function sendEmail(to, subject) {
    const mailOptions = {
        from: 'noabuseapp@gmail.com',
        to,
        subject,
        html:'<h1>Thank you for using the NoAbuse App and helping another child! We will constantly give you updates on the child! Stay blessed.'
    };

    transport.sendMail(mailOptions, (error) => {
        if (error) {
            console.log(error);
        }
    });
};
