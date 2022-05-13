// package imports
const mongoose = require("mongoose");
require('dotenv').config();
// monogdb URI
const mongoDB = `${process.env.DATABASE}`;

// connect to mongodb cluster
mongoose.connect(mongoDB);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// export db error
module.exports = db;