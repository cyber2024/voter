'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
	name: String,
	author: String,
	options:[String],
	votes: [{user: String, vote: Number}]
	
},
{ versionKey: false }
);

module.exports = mongoose.model('Poll', Poll);

