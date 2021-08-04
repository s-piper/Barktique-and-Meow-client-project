const express = require('express');
const router = express.Router();
require('dotenv').config();

const nodemailer = require('nodemailer')

const emailUser = process.env.MAIL_USER;
const emailPassword = process.env.MAIL_PASS;

const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        email: `${emailUser}`,
        pass: `${emailPassword}`
    }
});


router.post('/confirm', (req, res) => {

    const messageOptions = {
        from: ``,
        to: ``,
        subject: ``,
        text: ``
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