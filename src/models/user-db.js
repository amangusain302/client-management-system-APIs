//package imports
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const { stringify } = require('nodemon/lib/utils');

// users import
const UserModel = new mongoose.Schema({
    username: { //username should be unique
        type: String,
        unique: true,
        required: true
    },
    password: { //password  
        type: String,
        required: true
    },
    role: { //role : user / admin 
        type: String,
        default: "user",
        required: true
    },
    date: { // account creation time
        type: Date,
        default: Date.now
    }
});

//store in schema
const User = mongoose.model('users', UserModel);

//export
module.exports = User;