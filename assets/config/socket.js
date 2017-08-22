//config/socket.js
var User = require('../app/models/user.js');
var Game = require('../app/models/game.js');

var serverMsgColor = 'rgb(146, 234, 119)';

//TODO used rooms and users in them saved in db
//Rooms which are currently in use
var rooms = {};

module.exports = function(io, mongoose) {

	//middleware to check user
	//TODO some way to check authentication
	io.use(function (socket, next) {
    	// console.log("Query: ", socket.handshake.query);
    	// find the user in the database
		User.findOne({ '_id' :  socket.handshake.query.userID }, function(err, user) {
            // if there are any errors, return the error
           	if (err)
               	return console.log(err);
			// if no user is found return an error
			if (!user){
				console.log('User not found - cannot connect');
				next(new Error('Authentication error'));
			} else {
				//user is found
				console.log('User '+user.local.username+' was found in the database');
        		return next();
			}
		});
	});

	// =====================================
    // ON CONNECTION =======================
    // =====================================
	io.sockets.on('connection', function(socket){

		console.log('User '+socket.handshake.query.username+' connected');

		//Disconnects on every page reload
		socket.on('disconnect', function(){
			if(socket.curRoom){
				console.log('User '+socket.handshake.query.username+' has left room '+socket.curRoom);
				io.sockets.in(socket.curRoom).emit('userUpdate', false, socket.handshake.query.username);
			} else {
				console.log('user '+socket.handshake.query.username+' disconnected');
			}
		});

		// =====================================
    // ON LOUNGE CHAT ======================
    // =====================================
		socket.on('initLoungeChat', function(){

			console.log('User '+socket.handshake.query.username+' initiated the chat');
			io.sockets.in(socket.curRoom).emit('chat-message', 'SERVER', socket.handshake.query.username+' joined room '+socket.curRoom, serverMsgColor);

			//Receiving a chat message from a client
			socket.on('chat-message', function(msg){
				console.log('['+socket.curRoom+'] '+socket.handshake.query.username+': '+msg);
				//io.emit('chat-message', socket.handshake.query.username, msg);
				//sending the chat message to everyone in the clients room
				io.in(socket.curRoom).emit('chat-message', socket.handshake.query.username, msg);
			});

			socket.on('joinRoom', function(id, chatroom){

				//if he is already in a chatroom leave it
				if(socket.curRoom){
					socket.leave(socket.curRoom);
					console.log('User '+socket.handshake.query.username+' has left room '+socket.curRoom);
					//inform users in old room that the user left
					io.sockets.in(socket.curRoom).emit('chat-message', 'SERVER', socket.handshake.query.username+' left room '+socket.curRoom, serverMsgColor);
					//Delete user from user list
					io.sockets.in(socket.curRoom).emit('userUpdate', false, socket.handshake.query.username);
				}

				//join new chatroom
				socket.join(chatroom, function(){
					//emit a list of users in the new chatroom to the user
					socket.emit('userList', findClientsSocket(chatroom));
					//set the current room of the user to the new chatroom
					socket.curRoom = chatroom;
					//inform users in new room that user joined
					io.sockets.in(socket.curRoom).emit('chat-message', 'SERVER', socket.handshake.query.username+' joined room '+chatroom, serverMsgColor);
					//Update userlist of everyone in the new room, except the user
					socket.to(socket.curRoom).emit('userUpdate', true, socket.handshake.query.username);
				});
			});

		});

		// =====================================
    // ON GAME CHAT ========================
    // =====================================
		socket.on('initGameChat', function(gameID){

			//TODO Check if user is in the game
			Game.findOne({ '_id' :  gameID }, function(err, game) {
	      // if there are any errors, return the error
	      if (err)
	        return console.log(err);
				// if no game is found return an error
				if (!game){
					console.log('Game not found');
					// TODO flash massage and redirect to lounge?
				} else {
					//game is found
					//leave chat room
					if(socket.curRoom){
						socket.leave(socket.curRoom);
						console.log('User '+socket.handshake.query.username+' has left room '+socket.curRoom);
						//inform users in old room that the user joined a game
						io.sockets.in(socket.curRoom).emit('chat-message', 'SERVER', socket.handshake.query.username+' joined game '+game.name, serverMsgColor);
						//Delete user from user list
						io.sockets.in(socket.curRoom).emit('userUpdate', false, socket.handshake.query.username);
					}

					//join game chat
					socket.join(game._id, function(){
						//emit a list of users in the game to the user
						socket.emit('playerList', findClientsSocket(game._id));
						//set the current room of the user to the gameID
						socket.curRoom = game._id;
						//inform users in game that user joined
						io.sockets.in(socket.curRoom).emit('chat-message', 'SERVER', socket.handshake.query.username+' joined the game', serverMsgColor);
						//Update userlist of everyone in the game, except the user
						socket.to(socket.curRoom).emit('userUpdate', true, socket.handshake.query.username);
					});

				}
			});
		});


	});

	//source: http://stackoverflow.com/questions/6563885/socket-io-how-do-i-get-a-list-of-connected-sockets-clients?rq=1
	function findClientsSocket(roomId, namespace) {
    	var res = []
    	// the default namespace is "/"
    	, ns = io.of(namespace || "/");

    	if (ns) {
        	for (var id in ns.connected) {
            	if(roomId) {
                	if(roomId in ns.connected[id].rooms) {
                    	res.push(ns.connected[id].handshake.query.username);
                	}
            	} else {
                	res.push(ns.connected[id]);
            	}
        	}
    	}
    	return res;
	}
};
