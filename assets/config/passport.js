// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
var RememberMeStrategy = require('passport-remember-me').Strategy;

// load up the user model
var User            = require('../app/models/user.js');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'



    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'username',
        passwordField : 'password',
		emailField : 'email',
		countryField : 'country',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, email, done) {

        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.email' :  email }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {

                // if there is no user with that email
                // create the user
                var newUser            = new User();

                // set the user's local credentials
				        newUser.local.username = username;
                newUser.local.email    = email;
                newUser.local.password = newUser.generateHash(password);

				        newUser.trivia.country = req.body.country;
				        newUser.trivia.registered = new Date();

				        newUser.settings.defaultRoom = 'default';
				        newUser.settings.chatColor = 'rgb('+Math.floor(128+Math.random() * 127)+', '+Math.floor(128+Math.random() * 127)+', '+Math.floor(128+Math.random() * 127)+')';

                // save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }

        });

        });

    }));

	// =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
		    emailField : 'email',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, email, done) { // callback with email and password from our form
		//If there is an @ in the username search in emails
		//http://stackoverflow.com/questions/20958149/node-js-passport-strategy-login-with-either-email-or-username
		var criteria = (username.indexOf('@') === -1) ? {'local.username': username} : {'local.email': username};
        // find a user whose email or username is the same as the forms email or username
        // we are checking to see if the user trying to login already exists
        User.findOne(criteria, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

            // if the user is found but the password is wrong
            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user
			user.local.online = true;
            return done(null, user);
        });

    }));

	//Remember Me Strategy
	//Creates or consumes token for persistent login
	passport.use(new RememberMeStrategy(
		function(token, done) {
    		Token.consume(token, function (err, user) {
      			if (err) { return done(err); }
      			if (!user) { return done(null, false); }
				//Set the user to online whenn logging in by cookie
				user.local.online = true;
      			return done(null, user);
    		});
  		},
  		function(user, done) {
    		var token = utils.generateToken(64);
    		Token.save(token, { userId: user.id }, function(err) {
      			if (err) { return done(err); }
      			return done(null, token);
    		});
  		}
	));

};
