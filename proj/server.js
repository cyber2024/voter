'use strict';

var express = require("express"),
    routes = require("./app/routes/index.js"),
    mongoose = require('mongoose'),
    passport = require("passport");
    
var app = express();
var bodyParser = require('body-parser');
var session = require("express-session");

require('dotenv').load();
require('./app/config/passport.js')(passport);


mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on('connected', ()=>{
    console.log('Connected to mongoose.');
});
mongoose.connection.on('error', (err)=>{
    console.log('Mongoose error.', err);
});
mongoose.connection.on('disconnected', ()=>{
    console.log('Disconnected from mongoose.');
});

app.use('/controllers', express.static(process.cwd() + '/proj/app/controllers'));
app.use('/public', express.static(process.cwd() + '/proj/public'));
app.use('/common', express.static(process.cwd() + '/proj/app/common'));

app.use(session({
    secret:'voter_yeayea',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

routes(app, passport);

var port = process.env.PORT || 8080;

app.listen(port, function(){
   console.log('Listening on port %d.', port);
});