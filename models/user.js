// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var mongooseUniqueValidator = require('mongoose-unique-validator');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

	username	: {type: String, required: true, unique: true},
    email       : {type: String, required: true},
    password    : {type: String, required: true},

    messages    : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],

	trivia			 : {
		registered	 : { type: Date, default: Date.now },
        lastOnline   : Date,
		country		 : String,
		online		 : Boolean,
		curRoom		 : String,
        info         : String
	},
	stats			 : {
		wins		 : Number,
		loses		 : Number,
		onlinetime	 : Number
	},
	settings		 : {
		defaultRoom	 : { type: String, default: 'default' },
		chatColor	 : String
	},

    //Maybe using this some day
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }
});

userSchema.plugin(mongooseUniqueValidator);

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
