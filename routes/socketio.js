var socketioJwt = require('socketio-jwt');
var jwt = require('jsonwebtoken');
var Promise = require('bluebird');

var User = require('../models/user');
var Game = require('../models/game');

module.exports = function(server) {

    var io = require('socket.io')(server);
    var chatNsp = io.of('/chat');

    chatNsp.use(function(socket, next){
        if (socket.handshake.query && socket.handshake.query.token){
            var jwtVerify = Promise.promisify(jwt.verify);
            jwtVerify(socket.handshake.query.token, 'secret')
            .then(decoded => {
                socket.decoded = decoded;
                socket.id = decoded.user._id;
                socket.clientUserModel = {
                    id: socket.id,
                    username: socket.decoded.user.username
                };
                return next();
            })
            .catch(err => {
                //console.log(err);
                return next(new Error(
                    JSON.stringify({
                        title: 'Authentication error',
                        error: err
                    })
                ));
            });

            // without promise

            // jwt.verify(socket.handshake.query.token, 'secret', function(err, decoded) {
            //     if(err) return next(new Error('Authentication error'));
            //     socket.decoded = decoded;
            //     socket.id = decoded.user._id;
            //     socket.clientUserModel = {
            //         id: socket.id,
            //         username: socket.decoded.user.username
            //     };
            //     next();
            // });
        } else {
            return next(new Error({
                title: 'Authentication error',
                error: { error: { message: 'You need to be logged in for this.' } }
            }));
        }
    });

    chatNsp.on('connection',
        function(socket) {
            console.log('a user connected');
            User.findById(socket.id).exec()
            .then( (user) => {

            })

            socket.on('changeRoom', function(room) {
                changeRoom(socket, room);
            });

            socket.on('chatMessage', function(message) {
                message.username = socket.decoded.user.username;
                console.log('message: ' + message);
                console.log('Chatroom: ' + socket.decoded.user.data);
                chatNsp.in('default').emit('chatMessage', message);
                message.rooms = socket.rooms;
                delete message.rooms[socket.id];
            });

            socket.on('getGames', function() {
                Game.find().exec()
                .then( (games) => {
                    var clientGames = [];
                    for(var i =0; i<games.length; i++) {
                        clientGames.push({
                            id: games[i]._id,
                            name: games[i].name,
                            maxPlayers: games[i].maxPlayers,
                            curPlayers: games[i].players.length
                        })
                    }
                    socket.emit('gameList', JSON.stringify(clientGames));
                });
            });

            socket.on('joinGame', function(id) {
                joinGame(socket, id);
            });

            socket.on('createGame', function(gameName) {
                var newGame = new Game();
                newGame.name = gameName;
                newGame.save()
                .then((result)=>{
                    joinGame(socket, result._id);
                })
                .catch((err)=>{
                    console.log(err);
                });
            });

            socket.on('disconnect', function() {
                User.findById(socket.id).exec()
                .then( (user) => {
                    console.log(user.data.curRoom);
                    socket.to(user.data.curRoom).emit('userLeftRoom', socket.clientUserModel);
                    user.data.curRoom = undefined;
                    return user.save();
                })
                .then( (result) => {
                    console.log('user disconnected');
                })
                .catch( (err) => {
                    console.error(err);
                });
            });
        }
    );



    function changeRoom(socket, room) {
        //Leave old room
        User.findById(socket.id).exec()
        .then( (user) => {
            if(!user) {
                throw new Error('No user found');
            }
            if(room === user.data.curRoom) {
                //What to do here?
                //throw new Error('User is already in that room');
            }
            if(user.data.curRoom) {
                console.log(
                    'User "' +
                    socket.clientUserModel.username +
                    '" left room "' +
                    user.data.curRoom +
                    '" to join room "' +
                    room + '"'
                );
                chatNsp.to(user.data.curRoom).emit('userLeftRoom', socket.clientUserModel);
                socket.leave(user.data.curRoom);
            }
            //Join room
            socket.join(room);
            user.data.curRoom = room;
            return user.save();
        })
        .then( () => {
            //Find users in Room
            chatNsp.in(room).clients((err, userIds) => {
                if(err) console.log(err);

                var users = [];
                var promises = [];

                //Fill List of users in Room
                for(var i=0; i<userIds.length; i++) {
                    promises.push(
                        User.findById(userIds[i]).exec()
                        .then(function(user) {
                            users.push({
                                id: user._id,
                                username: user.username
                            });
                        })
                    );
                }

                //When the list of users in Room is filled
                Promise.all(promises)
                .then( () => {
                    var roomdata = {
                        room: room,
                        usersInRoom: users
                    };
                    //Send room info to user who changed rooms
                    roomdata = JSON.stringify(roomdata);
                    socket.emit('joinedRoom', roomdata);
                })
                .catch( (err) => {
                    console.error(err);
                });

                //Send all other users in room an update
                socket.to(room).emit('userJoinedRoom', socket.clientUserModel);
            });
        })
        .catch( (err) => {
            var errMsg = {
                title: 'Error joining room',
                error: err.message
            };
            socket.emit('customError', JSON.stringify(errMsg));
        });
    }

    function joinGame(socket, gameId) {
        var foundGame = Game.findById(gameId).exec();
        var foundUser = User.findById(socket.id).exec();

        Promise.all([foundGame, foundUser])
        .then( (results) => {
            var game = results[0];
            var user = results[1];
            if(game.players.length === game.maxPlayers) {
                throw new Error('Game is already full');
            }
            if(game.players.indexOf(user._id) !== -1) {
                throw new Error('You are already in the game');
            }
            if(user.data.curGame) {
                //TODO User is already in another game, confirm modal?
            }

            user.data.curGame = game._id;
            game.players.push(user._id);

            var gameSave = game.save();
            var userSave = user.save();
            return Promise.all([gameSave, userSave]);
        })
        .then( (results) => {
            socket.emit('joinedGame', results[0]);
        })
        .catch((error) => {
            var errMsg = {
                title: 'Error joining game',
                error: error.message
            };
            socket.emit('customError', JSON.stringify(errMsg));
        });
    }

    function leaveGame(socket, id) {
        var foundUser = User.findById(socket.id).exec();
        var foundGame = Game.findById(id).exec();

        Promise.all([foundGame, foundUser])
        .then( (results) => {
            var game = results[0];
            var user = results[1];

            var indexOfUser = game.players.indexOf(user._id);
            game.players.slice(indexOfUser, 1);
            user.data.curGame = undefined;

            var gameSave = game.save();
            var userSave = user.save();
            return Promise.all([gameSave, userSave]);
        })
        .then( (results) => {
            socket.emit('leftGame', null);
            console.log(results[1].username + ' left game ' + result[0].name);
        })
        .catch((error) => {
            var errMsg = {
                title: 'Error leaving game',
                error: error.message
            };
            socket.emit('customError', JSON.stringify(errMsg));
        });
    }
}
