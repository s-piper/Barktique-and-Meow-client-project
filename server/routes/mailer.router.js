require('dotenv').config();
const express = require('express');
const router = express.Router();

const nodemailer = require('nodemailer')

const emailUser = process.env.MAIL_USER;
const emailPassword = process.env.MAIL_PASS;

const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user: emailUser,
        pass: emailPassword,
    }
});

//Send email when the order is entered
router.post('/confirmation', (req, res) => {
    
    console.log('Mail data in =>', req.body);
    
    const messageOptions = {
        from: emailUser,
        to: req.body.cus_email,
        subject: `Barktique Order Confirmation`,
        text: `Thank You for your order!  We'll let you know when the work has been completed.`
    };

    transporter.sendMail(messageOptions, function (err, info) {
        if (err) {
            console.log('mailer error', err);
            return;
        } else {
            console.log('Email Sent', info.response);
        }
    });
});

//Send email when the order is marked completed
router.post('/completed', (req, res) => {

    console.log('Mail data in =>', req.body);

    const messageOptions = {
        from: emailUser,
        to: req.body.cus_email,
        subject: `Barktique Order Completed`,
        text: `Your order has wrapped up.  We'll send you a shipping email once it's on the way`
    };

    transporter.sendMail(messageOptions, function (err, info) {
        if (err) {
            console.log('mailer error', err);
            return;
        } else {
            console.log('Email Sent', info.response);
        }
    });
});

module.exports = router;