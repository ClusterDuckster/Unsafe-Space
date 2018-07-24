var express = require('express');
var router = express.Router();
var Promise = require('bluebird');
var jwt = require('jsonwebtoken');

var Game = require('../models/game');
var User = require('../models/user');

//final url will be host:port/game/...

//Check authentification
router.use('/', function(req, res, next) {
    jwt.verify(req.query.token, 'secret', function(err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Authentication error',
                error: err
            });
        } else {
            next();
        }
    });
});

router.get('/:id', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);

    var foundGame = Game.findById(req.params.id).populate('players').exec();
    var foundUser = User.findById(decoded.user._id).exec();

    Promise.all([foundGame, foundUser])
    .then( (results) => {
        var user = results[1];
        var players = [];
        var playerIds = [];
        var game = results[0];

        for (let i = 0; i<game.players.length; i++) {
            var transformedPlayer = {
                _id: game.players[i]._id,
                name: game.players[i].username
            }
            players.push(transformedPlayer);
            playerIds.push(game.players[i]._id.toString());
        }

        delete game.players;

        //Mongoose saves Ids as Objects so toString() is needed for comparison
        if(playerIds.indexOf(user._id.toString()) === -1) {
            throw new Error('User not in game');
        }

        return res.status(200).json({
            game: game,
            players: players
        });
    })
    .catch((error) => {
        return res.status(500).json({
            title: 'Error getting Game Data',
            error: {message: error.message}
        });
    });
});

module.exports = router;
