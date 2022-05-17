const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const fs = require('fs');
const req = require('express/lib/request');
const generatePdf = require("../pdfmaker/html-pdf");
const Invoice = require('../models/invoice-db');
const { sendStatus } = require('express/lib/response');
// const { sendStatus } = require('');

// router.post('/create', (req, res, next) => {

//     const invoice = new Invoice({
//         invoice_no: req.body.invoice_no,
//         due_date: req.body.due_date,
//         bill_to: req.body.bill_to,
//         items: req.body.items,
//         sub_total: req.body.sub_total
//     })

//     invoice.save()
//         .then(result => {
//             res.status(200).json({
//                 newinvoice: result
//             })
//         })
//         .catch(err => {
//             res.status(500).json({
//                 error: err
//             })
//         })
// })

// all invoice fetch

router.get('/read', (req, res, next) => {
    Invoice.find({})
        .exec()
        .then(result => {
            if (result.length < 1) {
                return res.status(401).json({
                    msg: 'No invoice exist'
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

router.get('/read/:invoice_no', (req, res, next) => {
    var invoice_no = req.params.invoice_no;
    var data = fs.readFileSync(`app/invoices/219.pdf`);
    // var data = fs.readFileSync(`E:/client management/api/invoices/${invoice_no}.pdf`);
    res.contentType("application/pdf");
    res.send(data);
})

// router.get('/:_id', (req, res, next) => {
//     Invoice.findById({ _id: req.params._id })
//         .exec()
//         .then(result => {
//             if (result.length < 1) {
//                 return res.status(401).json({
//                     msg: 'No invoice exist'
//                 })
//             }
//             res.send(result);
//         })
//         .catch(err => {
//             res.status(500).json({
//                 message: "invoice not exist",
//                 error: err
//             })
//         })
// })

router.put('/update', (req, res, next) => {
    var total = 0;
    req.body.items.forEach(item => {
        total = total + parseInt(item.total_price);
    });


    var invoice_no
    var invoice_data = () => {
        return Invoice.find({});
    }
    invoice_data().then(invoiceRes => {
        var invoiceNo = invoiceRes[0].invoice_no;
        invoice_no = invoiceNo + 1;
        console.log(invoice_no, "increament");


        console.log(invoice_no, "final output");
        Invoice.findOneAndUpdate({}, {
                $set: {
                    invoice_no: invoice_no,
                    due_date: req.body.due_date,
                    bill_to: req.body.bill_to,
                    items: req.body.items,
                    sub_total: total
                }
            })
            .then(result => {
                console.log(result);
                generatePdf(invoice_no).then((response) => {
                    // console.log(response);
                    if (response.status) {
                        // console.log(result)
                        res.status(200).json({
                            message: "invoice genrated",
                            status: true,
                            link: `https://clientpoint.herokuapp.com/invoice/read/${invoice_no}`
                        })
                    }

                }).catch(err => console.log(err, "pdf error"))
            })
            .catch(err => {
                res.status(500).json({
                    message: "invoice not created",
                    status: false,
                    error: err
                })
            })
    });
})

module.exports = router;