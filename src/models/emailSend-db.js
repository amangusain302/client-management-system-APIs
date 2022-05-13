const mongoose = require('mongoose');
const validator = require('validator');
const { stringify } = require('nodemon/lib/utils');
const { required } = require('nodemon/lib/config');
const rules = require('nodemon/lib/rules');

const emailSendModel = new mongoose.Schema({
    client_id: {
        type: Number,
        required: true
    },
    sender_username: {
        type: String,
        required: true,
    },
    email_to: {
        type: String,
        required: true,
    },
    email_subject: {
        type: String,
        required: true
    },
    email_body: {
        type: String,
        required: true
    },
    send_date: {
        type: Date,
        required: true,
        default: Date.now
    }
})
const EmailSends = mongoose.model('email_sends', emailSendModel);

//export
module.exports = EmailSends;