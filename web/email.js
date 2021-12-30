const nodemailer = require('nodemailer');
const logger = require('../logger');

function getTransporter() {
    // return nodemailer.createTestAccount({
    //     host: "smtp.ethereal.email",
    //     port: 587,
    //     secure: false, // true for 465, false for other ports
    //     auth: {
    //         user: testAccount.user, // generated ethereal user
    //         pass: testAccount.pass, // generated ethereal password
    //     },
    // });
    return nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: "587",
        secure: false,
        auth: {
            user: "jeevanaawara33@gmail.com",
            pass: "hmyvswdpgtordgkq"
        }
    });
}


exports.sendEmail = async (subject, to, text) => {
    getTransporter().sendMail({
        from: 'jeevanaawara33@gmail.com',
        subject: subject,
        to: to,
        text: text
    }, (err, info) => {
        if (err) logger.error(err);
        if (info) logger.info(info);
    })
}