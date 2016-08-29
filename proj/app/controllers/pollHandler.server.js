'user strict';

var Poll = require(process.cwd()+'/proj/app/models/poll.js');


function pollHandler(){
   this.getPolls = function(req,res){
       Poll.find({}).exec(function(err, data){
           if(err){
               throw new Error('error getting Poll from mlab', err);
           } 
           console.log('data',data);
           res.json(data);
        });
   };
   
   this.create = function(req,res){
       Poll.findOne({name:req.body.pollName})
       .exec(function(err, data){
          if(err){throw new Error(err);}
          console.log(data);
          if(data){
             console.log("already created",req.body.pollName);
          } else {
             var poll = new Poll();
             poll.name = req.body.pollName;
             poll.options = [];
             poll.save(function(err, data){
                 if(err){throw new Error(err);}
                 res.json(data);
             });
          }
       });
   }
   this.delete = function(req,res){
       console.log('delete poll');
   }
   this.update = function(req,res){
       console.log('update poll');
   }

};

module.exports = pollHandler;