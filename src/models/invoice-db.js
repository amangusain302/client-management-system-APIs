const mongoose = require('mongoose');
const validator = require('validator');
const { stringify } = require('nodemon/lib/utils');
const { required } = require('nodemon/lib/config');

const InvoiceModel = new mongoose.Schema({
    invoice_no: {
        type: Number,
        required: true,
        unique: true,
    },
    due_date: {
        type: String,
        // required: true
    },
    created_date: {
        type: Date,
        required: true,
        default: Date.now
    },
    bill_to: [{
        name: {
            type: String,
            // required: true
        },
        contact: {
            type: Number,
            // required: true
        },
        address: {
            type: String,
            // required: true
        }
    }],
    items: [{
        description: {
            type: String,
            // required: true
        },
        unitprice: {
            type: Number,
            // required: true
        },
        quantity: {
            type: Number,
            // required: true
        },
        total_price: {
            type: Number,
            // required: true
        }
    }],

    sub_total: {
        type: Number,
        // required: true
    }
    // discount: {
    //     type: Number,
    //     required: true
    // },
    // tax_rate: {
    //     type: Number,
    //     required: true
    // },
    // tax: {
    //     type: Number,
    //     required: true
    // },
    // total: {
    //     type: Number,
    //     required: true
    // },

});
const Invoice = mongoose.model('invoice-data', InvoiceModel);

//export
module.exports = Invoice;