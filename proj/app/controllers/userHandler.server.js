'use strict';

var User = require(process.cwd() + '/proj/app/models/user.js');

var userHandler = function(){
    this.getUser = function(req,res){
        res.json(req.user); 
    }
}

module.exports = userHandler;
