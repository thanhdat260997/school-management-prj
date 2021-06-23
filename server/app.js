const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db');
var cors = require('cors')
var morgan = require('morgan');

const dbConnection = mongoose.connection;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));

app.use("/avatar", express.static(__dirname + '/avatar'));


let verifyAuthen = require('./verify-authentication');
const authenticationRouter = require('./routes/authentication');
const userRouter = require('./routes/user');
const roomRouter = require('./routes/room');
const classRouter = require('./routes/class');

app.use('/auth', authenticationRouter);
app.use('/api', userRouter);
app.use('/api', verifyAuthen(), roomRouter);
app.use('/api', verifyAuthen(), classRouter);

app.get('*', function(req, res, next) {
    res.send("hi");
});

app.listen('9000', function () {
    console.log('Listening on port 4000');
})

dbConnection.on('error', console.error.bind(console, 'connection error:'));
dbConnection.once('open', function() {
  console.log("Connected to db")
});