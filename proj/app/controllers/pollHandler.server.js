'user strict';

var Poll = require(process.cwd()+'/proj/app/models/poll.js');

function findPoll(id, callback){
    Poll.findById(id, function(err,poll){
            if(err) 
                throw err;
            if(poll)
               callback(poll);
            else 
               callback(null);
    });
}

function findArrayIndex(array, item){
    var index = -1;
    array.forEach(function(itm, idx){
        console.log(itm, idx);
       if(itm.name == item)
        index = idx;
    });
    return index;
}
function vote(poll, user, option){
    var found = false;
    for(var i = 0; i < poll.votes.length; i++){
        if(poll.votes[i].user == user){
            poll.votes[i].vote = option;
            console.log('vote updated');
            return true;
        }
    }
    poll.votes.push({user:user,vote:option});
    console.log('vote created');
    return true;
}

function pollHandler(){
   this.getPolls = function(req,res){
       Poll.find({}).exec(function(err, data){
           if(err){
               throw new Error('error getting Poll from mlab', err);
           } 
           console.log(data);
           res.json(data);
        });
   };
   
   this.create = function(req,res){
       Poll.findById(req.body.poll_id)
       .exec(function(err, data){
          if(err){throw new Error(err);}
          console.log(data);
          if(data){
             console.log("already created",req.body.pollName);
          } else {
                var poll = new Poll();
                poll.name = req.body.pollName;
                poll.author = req.body.pollAuthor;
                poll.options = [];
                if(req.body.option1)
                    poll.options.push(req.body.option1);
                if(req.body.option2)
                    poll.options.push(req.body.option2);
                console.log('create',req.body);
             poll.save(function(err, data){
                 if(err){throw new Error(err);}
                 res.json(data);
             });
          }
       });
   }
   this.delete = function(req,res){
        Poll.findById(req.body._id).remove(function(err){
            if(err){
                res.json({"error":"could not delete", "msg":err});
            } else {
                res.json({'success':'deleted '+req.body._id});
            }
       });
   }
   this.vote = function(req,res){
       var pollId = req.body.pollId;
       var pollOptionName = req.body.pollOptionName;
       var user = (req.user? req.user.github.id : getIP(req));
       console.log(req.body);
       console.log('user(' +user + ') is voting on pollId(', pollId+') ', 'for option ('+pollOptionName+')');
       if(!pollId || !pollOptionName){
           throw new Error('req.body does not contain pollID or pollOptionName', pollId, pollOptionName);
       }
       findPoll(pollId, function(poll){
          if(!poll){
              return res.json({err:"no poll"});
          }
            console.log('poll found',poll);
          
            var op = poll.options.indexOf(pollOptionName);
            if(op == -1){
                poll.options.push(pollOptionName);
                op = poll.options.length -1;
                console.log('Option ('+pollOptionName+') added to poll -'+ 'poll.options['+op+']='+ poll.options[op]);
            }
            var voteIndex = vote(poll, user, op);
                poll.save(function(err){
                   if(err){
                       console.log('error saving poll');
                       return res.json({err:"error saving poll"});
                   }  else {
                       console.log('poll saved\n',poll);
                       return res.json({msg:"poll saved"});
                   }
                });
            
       });
   }

};

function getIP(req){
   return req.headers['x-forwarded-for'];
}

module.exports = pollHandler;