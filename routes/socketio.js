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

            socket.on('changeRoom', function(room) {
                changeRoom(socket, room);
            });

            socket.on('chatMessage', function(message) {
                message.username = socket.decoded.user.username;
                chatNsp.in('default').emit('chatMessage', message);
                message.rooms = socket.rooms;
                delete message.rooms[socket.id];
                console.log(message);
            });

            socket.on('getGames', function() {
                Game.find().exec()
                .then( (games) => {
                    var clientGames = [];
                    for(var i =0; i<games.length; i++) {
                        clientGames.push({
                            id: games[i]._id,
                            name: games[i].name
                        })
                    }
                    socket.emit('gameList', JSON.stringify(clientGames));
                });
            });

            socket.on('createGame', function(gameName) {
                var newGame = new Game();
                newGame.name = gameName;
                newGame.players.push(socket.decoded.user);
                newGame.save()
                .then((result)=>{
                    var clientGame = {
                        id: result._id,
                        name: result.name
                    }
                    socket.emit('createdGame', clientGame);
                    // console.log(result);
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
            console.error(err);
        });
    }
}
