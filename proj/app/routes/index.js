'use strict';
var path = process.cwd();
var PollHandler = require(path+'/proj/app/controllers/pollHandler.server.js');
var UserHandler = require(path + '/proj/app/controllers/userHandler.server.js');

var pollHandler = new PollHandler();
var userHandler = new UserHandler();

module.exports = function(app, passport){
    app.route('/')
        .get(function(req,res){
            res.sendFile(process.cwd() + '/proj/public/index.html');
        });
    
    app.route('/poll')
        .get(pollHandler.getPolls)
        .post(pollHandler.create)
        .delete(pollHandler.delete)
        .put(pollHandler.update);
    
    app.route('/auth/github')
        .get(passport.authenticate('github'));
    
    app.route('/api/user')
        .get(userHandler.getUser);
        
    app.route('/auth/github/callback')
        .get(passport.authenticate('github',{
            successRedirect: '/',
            failureRedirect: '/'
        }));
    
}