'use strict';
var path = process.cwd();
var PollHandler = require(path+'/proj/app/controllers/pollHandler.server.js');

var pollHandler = new PollHandler();

module.exports = function(app){
    app.route('/')
        .get(function(req,res){
            res.sendFile(process.cwd() + '/proj/public/index.html');
        });
    
    app.route('/poll')
        .get(pollHandler.getPolls)
        .post(pollHandler.create)
        .delete(pollHandler.delete)
        .put(pollHandler.update);
    
}