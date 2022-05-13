const mongoose = require('mongoose');
const validator = require('validator');
const { stringify } = require('nodemon/lib/utils');
const { required } = require('nodemon/lib/config');


//creating schema for proposal 
const ProposalModel = new mongoose.Schema({
    client_id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    catagory: {
        type: String,
        required: true
    },
    revenue: {
        type: Number,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    account: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip_code: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email_sends: {
        type: Array
    },
    sent: { //show the follow up to the client
        type: Boolean,
        default: false
    },
    view: {
        type: Boolean,
        default: false
    },
    comment: {
        type: Boolean,
    },
    download: {
        type: Boolean
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }

});

// autoIncrement.initialize(mongoose.connection);
// ProposalModel.plugin(autoIncrement.plugin, {
//     model: 'ProposalModel',
//     field: 'client_id',
//     startAt: 100,
//     incrementBy: 1
// });

//store in schema
const Proposal = mongoose.model('proposal-details', ProposalModel);

//export
module.exports = Proposal;