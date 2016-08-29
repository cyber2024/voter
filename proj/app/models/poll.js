'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
	name: String,
	author: Schema.ObjectId,
	options:[{
	    name: String,
	    votes: [Schema.ObjectId]
	}]
},
{ versionKey: false }
);

module.exports = mongoose.model('Poll', Poll);
