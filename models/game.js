// app/models/game.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our game model
var gameSchema = mongoose.Schema({

	name: String,

	started: { type: Boolean, default: false },
	createdOn: { type: Date, defailt: Date.now },
	startedOn: Date,

  players: { type: Array, default: [] },
	maxPlayers: Number,

	settings: {

		//TODO more settings?

		map: String

	}



});

// create the model for users and expose it to our app
module.exports = mongoose.model('Game', gameSchema);
