const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const Proposal = require('../models/proposal-db');
// const req = require('express/lib/request');
const EmailSends = require('../models/emailSend-db.js');
const { response } = require('express');


// getting mail data from frontend send to the client using Nodemailer function 

router.post('/send', (req, res, next) => {

    const emailSend = new EmailSends({
        client_id: req.body.client_id,
        sender_username: req.body.sender_username,
        email_to: req.body.email_to,
        email_subject: req.body.email_subject,
        email_body: req.body.email_body
    })

    emailSend.save()
        .then(async result => {
            // console.log(req.body.client_objId);  
            let data = await emailNodemailer(req.body.email_to, req.body.email_subject, result._id); //using Nodemailer fuction define below
            if (data.accepted) {
                Proposal.findByIdAndUpdate({ _id: req.body.client_objId }, { $push: { email_sends: result._id }, sent: true }) //using proposal model 
                    .then() //updating new mails object Id in proposal collection
                    .catch(err => console.log(err))

                res.status(200).json({
                    status: true,
                    message: "email created",
                    newemail: result
                })
            } else {
                res.status(500).json({
                    status: false,
                    error: data.response
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                status: false,
                error: err
            })
        })
})

//read all mails

router.get("/read", (req, res, next) => {
    EmailSends.find({})
        .exec()
        .then(result => {
            if (result.length < 1) {
                return res.status(401).json({
                    msg: 'No invoice exist'
                })
            }
            res.send(result)
        })
        .catch(err => {
            res.status(500).json({
                err: err,
                message: "error",
                status: false
            })
        })
})

// get single email data 

router.get("/search/:_id", (req, res, next) => {
    EmailSends.findById({ _id: req.params._id })
        .then(result => {
            res.status(200).json({
                status: true,
                message: "Data found",
                result: result
            })
        })
        .catch(err => {
            res.status(500).json({
                status: false,
                err: err
            })
        })
});



//Nodemailer function using for sending mail
const emailNodemailer = async(to, subject, id) => {
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: "email",
            pass: "password"
        }
    });
    var mailOptions = {
        from: 'emails',
        to: to,
        subject: subject,
        html: `<h1>demo data<h1><a href="https://client-point.herokuapp.com/client/${id}"> click here</a>`
    }

    let data = await transporter.sendMail(mailOptions);
    // console.log(data);
    return data;
}


module.exports = router;
