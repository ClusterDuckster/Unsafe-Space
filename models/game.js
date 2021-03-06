// app/models/game.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our game model
var gameSchema = mongoose.Schema({

	name: String,

	createdOn: { type: Date, defailt: Date.now },
	started: { type: Boolean, default: false },
	startedOn: Date,

	players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	maxPlayers: {type:Number, default: 2},

	settings: {

		//TODO more settings?

		map: {type:String, default:'default'}

	}



});

// create the model for users and expose it to our app
module.exports = mongoose.model('Game', gameSchema);
