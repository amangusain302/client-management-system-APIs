//package import
const express = require('express');
const cors = require('cors');
const req = require('express/lib/request');
// const router = require('./router/user-route');
require("./db/conn");
const dot_env = require('dotenv');
dot_env.config();
//route files
const usersRoute = require('./router/user-route');
const proposalRoute = require('./router/proposal-route');
const invoiceRoute = require('./router/invoice-route');
const SendEmailRoute = require('./router/emailSend-route');
const dashboardRoute = require('./router/dashboard-route');

//init

const app = express();
//inisilising port
const port = process.env.PORT || 8000;
app.use(cors());

//use
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json());

app.use('/emailsend', SendEmailRoute);
app.use('/invoice', invoiceRoute);
app.use('/user', usersRoute);
app.use('/proposal', proposalRoute);
app.use('/activity', dashboardRoute);

app.get("/", (req, res) => {
    res.send({
        message: "success"
    })
})
// if(process.env.NODE_ENV=="production"){
//     app.use(express.static('../client/build'));
// }
app.listen(port, () => {
    console.log(`connection is setup at ${port}`);
});