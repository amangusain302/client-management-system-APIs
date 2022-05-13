const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const req = require('express/lib/request');
const Proposal = require('../models/proposal-db');

router.post('/create', (req, res, next) => {
    let date = new Date();
    // console.log(date);
    // console.log(date.getMilliseconds());
    // console.log(date.getSeconds());
    client_id = `${date.getHours()}${date.getMinutes()}${date.getSeconds()}${date.getMilliseconds()}`;
    const proposal = new Proposal({
        client_id: client_id,
        name: req.body.name,
        status: req.body.status,
        catagory: req.body.catagory,
        revenue: req.body.revenue,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        mobile: req.body.mobile,
        email: req.body.email,
        account: req.body.account,
        country: req.body.country,
        state: req.body.state,
        zip_code: req.body.zip_code,
        address: req.body.address,
        comment: req.body.comment,
        download: req.body.download,
        date: date
    })

    proposal.save()
        .then(result => {
            res.status(200).json({
                message: "proposal has been created",
                status: true,
                newproposal: result

            })
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                status: false
            })
        })
})

// to fetch all proposal data 
router.get('/read', (req, res, next) => {
    Proposal.find({})
        .exec()
        .then(result => {
            if (result.length < 1) {
                return res.status(401).json({
                    msg: 'No proposal exist'
                })
            }
            res.send(result);
        })
        .catch(err => {
            res.status(500).json({
                err: err
            })
        })
})

// to delete proposal data

router.delete('/delete/:client_id', (req, res, next) => {
    Proposal.deleteOne({ client_id: req.params.client_id })
        .then(result => {
            if (result.deletedCount == 0) {
                res.status(202).json({
                    message: "proposal not exist",
                    delete: false,
                    result: result
                })
            } else {
                res.status(202).json({
                    message: "proposal deleted",
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

// to update proposal details 
router.put('/update/:_id', (req, res, next) => {
    Proposal.findOneAndUpdate({ _id: req.params._id }, {
            $set: {
                name: req.body.name,
                status: req.body.status,
                catagory: req.body.catagory,
                revenue: req.body.revenue,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                mobile: req.body.mobile,
                email: req.body.email,
                account: req.body.account,
                country: req.body.country,
                state: req.body.state,
                zip_code: req.body.zip_code,
                address: req.body.address,
                comment: req.body.comment,
                download: req.body.download,
            }
        })
        .then(result => {
            res.status(200).json({
                message: "proposal has been updated",
                status: true,
                proposal_update: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                status: false
            })
        })
})

// to fetch single proposal 
router.get('/read/:_id', (req, res, next) => {
    Proposal.findById({ _id: req.params._id })
        .exec()
        .then(result => {
            if (result.length < 1) {
                return res.status(401).json({
                    msg: 'No proposal exist'
                })
            } else {
                res.status(200).json({
                    message: "succesfully fetch data",
                    status: true,
                    result: result
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                err: err,
                status: false
            })
        })
})


// for getting recent proposal

router.get('/recent', (req, res, next) => {
    Proposal.find({}).sort({ date: -1 }).limit(10)
        .exec()
        .then(result => {
            res.status(200).json({
                message: "data found",
                data: result,
                status: true
            })
        })
        .catch(err => {
            res.status(500).json({
                message: "Error",
                status: false,
                error: err
            })
        })
})

// search api for proposal search 

router.get('/search/:key', (req, res, next) => {
    key = req.params.key;
    Proposal.find({
            $or: [
                { name: { $regex: req.params.key, $options: 'i' } },
                { client_id: { $regex: parseInt(req.params.key) } },
                { status: { $regex: req.params.key, $options: 'i' } }
            ]
        })
        .exec()
        .then(result => {
            // console.log(result);
            if (result.length !== 0) {
                res.status(200).json({
                    status: true,
                    message: "data found",
                    data: result
                })
            } else {
                res.status(200).json({
                    status: false,
                    message: "search item not found",
                    data: result
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

// updating view after client open mails 

router.put('/view/:clientId', (req, res, next) => {
    Proposal.findOneAndUpdate({ client_id: req.params.clientId }, { view: true })
        .exec()
        .then(result => {
            res.status(200).json({
                status: true,
                message: "updated",
                result: result
            })
        })
        .catch(err => {
            res.status(500).json({
                status: false,
                error: err
            })
        })
})
module.exports = router;