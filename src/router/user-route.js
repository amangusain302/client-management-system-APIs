const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user-db');
const req = require('express/lib/request');
const jwt = require('jsonwebtoken');
const SALTROUNDS = 10;

// user create account router
router.post('/signup', (req, res, next) => {

    bcrypt.genSalt(SALTROUNDS, (err, salt) => {
        if (err) { return next(err); }
        bcrypt.hash(req.body.password, salt, (err, hash) => { //encrypting user password
            if (err) {
                return res.status(400).json({
                    error: err,
                    message: "error"
                })
            } else {
                let user = new User({
                    username: req.body.username,
                    password: hash,
                    role: req.body.role,
                })
                user.save() // saving the data in database
                    .then(result => {
                        res.status(200).json({
                            message: "user created succesfully",
                            new_user: result,
                            status: true
                        })
                    })
                    .catch(err => {
                        if (err.code == 11000) {
                            res.status(200).json({
                                message: "username already exist",
                                status: false,
                                error: err
                            })
                        } else {
                            res.status(400).json({
                                status: false,
                                error: err
                            })
                        }

                    })
            }
        })
    })
})


// user login router

router.post("/login", (req, res, next) => {
    User.find({ username: req.body.username }) //finding the username from database
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    msg: 'user not exist'
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => { //comparing enter password with database encrypted password
                if (!result) {
                    return res.status(401).json({
                        msg: 'password not matched'
                    })
                }
                if (result) {
                    const token = jwt.sign({ //Genrating token for user after login
                            username: user[0].username,
                            role: user[0].role
                        },
                        "this is a dummy text", {
                            expiresIn: "24"
                        },
                    );
                    res.status(200).json({
                        username: user[0].username,
                        role: user[0].role,
                        token: token
                    })
                }
            })

        })
        .catch(err => {
            res.status(500).json({
                err: err,
                message: "invalid credentials"
            })
        })
})

// user delete router

router.delete('/:id', (req, res, next) => {
    User.deleteOne({ _id: req.params.id })
        .then(result => {
            if (result.deletedCount == 0) {
                res.status(202).json({
                    message: 'user not exist',
                    delete: false,
                    result: result
                })
            } else {
                res.status(200).json({
                    message: 'User deleted',
                    delete: true,
                    result: result
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})

// featch all users/admin data

router.get('/all', (req, res, next) => {
    User.find({})
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    msg: 'No user exist'
                })
            }
            res.status(200).json({
                message: "all user found",
                status: true,
                data: user
            });
        })
        .catch(err => {
            res.status(500).json({
                err: err,
                status: false
            })
        })
})


// to featch user data
router.get('/users', (req, res, next) => {
    User.find({ role: "user" })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    msg: 'No user exist'
                })
            }
            res.status(200).json({
                message: "all user found",
                status: true,
                data: user
            });
        })
        .catch(err => {
            res.status(500).json({
                err: err,
                status: false
            })
        })
})


// search user 

router.get('/ search/:key', (req, res, next) => {
    User.find({ username: { $regex: req.params.key, $options: 'i' } })
        .exec()
        .then(result => {
            res.status(200).json({
                status: true,
                message: "result found",
                data: result
            })
        })
        .catch(err => {
            res.status.json({
                status: false,
                error: err
            })
        })
})

router.get('/verify/:user', (req, res, next) => {
    User.find({ username: req.params.user })
        .exec()
        .then(result => {
            if (result.length !== 0) {
                res.status(200).json({
                    status: true,
                    message: "user exist",
                })
            } else {
                res.status(500).json({
                    status: false,
                    message: "user not exist"
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
module.exports = router; // exporting router file