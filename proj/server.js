'use strict';

var express = require("express"),
    routes = require("./app/routes/index.js"),
    mongoose = require('mongoose');
    
var app = express();
var bodyParser = require('body-parser');

require('dotenv').load();


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
app.use(bodyParser.json());

routes(app);

var port = process.env.PORT || 8080;

app.listen(port, ()=>{
   console.log('Listening on port %d.', port);
});