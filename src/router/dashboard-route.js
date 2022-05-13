const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const req = require('express/lib/request');
const Proposal = require('../models/proposal-db');
const EmailSends = require('../models/emailSend-db.js');
const { JSHandle } = require('puppeteer');
const { json } = require('express/lib/response');





// activites column

router.get('/', async(req, res, next) => {
    let activites = {
        sent: 0,
        view: 0,
        create: 0,
        unsent: 0,
        amount_won: 0,
        pending: 0
    }
    await Proposal.countDocuments({ sent: true })
        .exec()
        .then(result => {
            activites.sent = result;
        })
        .catch(err => {
            console.log(err);
        })

    await Proposal.countDocuments({})
        .exec()
        .then(result => {
            activites.create = result;
        })
        .catch(err => {
            console.log(err);
        })

    await Proposal.countDocuments({ view: true })
        .exec()
        .then(result => {
            activites.view = result;
        })
        .catch(err => {
            console.log(err);
        })

    await Proposal.countDocuments({ sent: false })
        .exec()
        .then(result => {
            activites.unsent = result;
        })
        .catch(err => {
            console.log(err);
        })

    await Proposal.find({ status: { $regex: "active", $options: 'i' } })
        .exec()
        .then(result => {
            result.forEach(data => {
                    activites.amount_won = activites.amount_won + data.revenue;
                })
                // console.log(result);
                // console.log(activites.amount_won);
        })

    await Proposal.find({ status: { $regex: "pending", $options: 'i' } })
        .exec()
        .then(result => {
            result.forEach(data => {
                    activites.pending = activites.pending + data.revenue;
                })
                // console.log(result);
                // console.log(activites.pending);
        })

    res.status(200).json({
        status: true,
        data: activites
    });
})


router.get('/amount_won', async(req, res, next) => {
    var amount_won = [{
            name: 'Jan',
            revenue: 0,

        },
        {
            name: 'Feb',
            revenue: 0,
        },
        {
            name: 'Mar',
            revenue: 0,
        },
        {
            name: 'Apr',
            revenue: 0,
        },
        {
            name: 'May',
            revenue: 0,
        },
        {
            name: 'Jun',
            revenue: 0,
        },

        {
            name: 'Jul',
            revenue: 0,
        },
        {
            name: 'Aug',
            revenue: 0,
        },
        {
            name: 'Sep',
            revenue: 0,
        },
        {
            name: 'Oct',
            revenue: 0,
        },
        {
            name: 'Nov',
            revenue: 0,
        },
        {
            name: 'Dec',
            revenue: 0,
        }
    ];
    const year = new Date().getFullYear();
    await Proposal.aggregate([{
            $match: {
                status: { $regex: "active" },
                date: { $gte: new Date(`${year}-01-01`), $lte: new Date(`${year}-12-31`) }
            }
        }, {
            $group: {
                _id: { "$month": "$date" },
                totalValue: { "$sum": "$revenue" }
            }
        }])
        .exec()
        .then(result => {

            result.forEach(data => {
                if (months(data._id) === amount_won[data._id - 1].name) {
                    amount_won[data._id - 1].revenue = data.totalValue;
                }
            })
            res.status(200).json({
                status: true,
                result: amount_won
            })
        })
        .catch(err => {
            res.status(500).json({
                status: false,
                error: err
            })
        })

})

// email sent

router.get('/sent', async(req, res, next) => {
    var email_send = [{
            name: 'Jan',
            sent: 0,

        },
        {
            name: 'Feb',
            sent: 0,
        },
        {
            name: 'Mar',
            sent: 0,
        },
        {
            name: 'Apr',
            sent: 0,
        },
        {
            name: 'May',
            sent: 0,
        },
        {
            name: 'Jun',
            sent: 0,
        },

        {
            name: 'Jul',
            sent: 0,
        },
        {
            name: 'Aug',
            sent: 0,
        },
        {
            name: 'Sep',
            sent: 0,
        },
        {
            name: 'Oct',
            sent: 0,
        },
        {
            name: 'Nov',
            sent: 0,
        },
        {
            name: 'Dec',
            sent: 0,
        }
    ];
    const year = new Date().getFullYear();
    await EmailSends.aggregate([{
        $match: {
            // sender_username: { $regex: "garv" },
            send_date: { $gte: new Date(`${year}-01-01`), $lte: new Date(`${year}-12-31`) }
        }
    }, {
        $group: {
            _id: { "$month": "$send_date" },
            count: { "$sum": 1 }
        }
    }])

    // EmailSends.countDocuments({ date: { $gte: new Date(`${year}/04/01`), $lte: new Date(`${year}/04/25`) } }, )
    .exec()
        .then(result => {

            result.forEach(data => {
                if (months(data._id) === email_send[data._id - 1].name) {
                    email_send[data._id - 1].sent = data.count;
                }
            })
            res.status(200).json({
                status: true,
                result: email_send
            })
        })
        .catch(err => {
            res.status(500).json({
                status: false,
                error: err
            })
        })

})

// how many proposal created month wise

router.get('/created', async(req, res, next) => {
    var proposal_created = [{
            name: 'Jan',
            created: 0,

        },
        {
            name: 'Feb',
            created: 0,
        },
        {
            name: 'Mar',
            created: 0,
        },
        {
            name: 'Apr',
            created: 0,
        },
        {
            name: 'May',
            created: 0,
        },
        {
            name: 'Jun',
            created: 0,
        },

        {
            name: 'Jul',
            created: 0,
        },
        {
            name: 'Aug',
            created: 0,
        },
        {
            name: 'Sep',
            created: 0,
        },
        {
            name: 'Oct',
            created: 0,
        },
        {
            name: 'Nov',
            created: 0,
        },
        {
            name: 'Dec',
            created: 0,
        }
    ];

    const year = new Date().getFullYear();
    await Proposal.aggregate([{
                $match: {
                    date: { $gte: new Date(`${year}-01-01`), $lte: new Date(`${year}-12-31`) }
                }
            },
            {
                $group: {
                    _id: { "$month": "$date" },
                    count: { "$sum": 1 }
                }
            }
        ])
        .then(result => {
            result.forEach(data => {
                if (months(data._id) === proposal_created[data._id - 1].name) {
                    proposal_created[data._id - 1].created = data.count;
                }
            })
            res.status(200).json({
                status: true,
                result: proposal_created
            })
        })
        .catch(err => {
            res.status(500).json({
                status: false,
                error: err
            })
        })

})




function months(month) {
    let name;
    switch (month) {
        case 1:
            name = "Jan";
            break;
        case 2:
            name = "Feb";
            break;
        case 3:
            name = "Mar";
            break;
        case 4:
            name = "Apr";
            break;
        case 5:
            name = "May";
            break;
        case 6:
            name = "Jun";
            break;
        case 7:
            name = "Jul";
            break;
        case 8:
            name = "Aug";
            break;
        case 9:
            name = "Sep";
            break;
        case 10:
            name = "Oct";
            break;
        case 11:
            name = "Nov";
            break;
        case 12:
            name = "Dec";
            break;
        default:
            name = null;
            break;
    }
    return name;
}
module.exports = router;