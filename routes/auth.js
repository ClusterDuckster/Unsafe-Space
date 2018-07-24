var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/user');

//final url will be host:port/auth/...

router.post('/signin', function (req, res, next) {
    var searchCriteria;
    if(!req.body.email && req.body.username){
        searchCriteria = {username: req.body.username};
    } else if (!req.body.username && req.body.email){
        searchCriteria = {email: req.body.email}
    } else {
        return res.status(401).json({
            title: 'Login failed',
            error: {message: 'Invalid login credentials'}
        });
    }

    User.findOne(searchCriteria)
        .then(function(user){
            //If no user or password not valid
            if(!user ? true : !user.validPassword(req.body.password)){
                return res.status(401).json({
                    title: 'Login failed',
                    error: {message: 'Invalid login credentials'}
                });
            }
            //SUCCESS
            var token = jwt.sign(
                {user: user},
                'secret',
                {expiresIn: 7200}
            );

            return res.status(200).json({
                title: 'Successfully logged in',
                token: token,
                username: user.username,
                userId: user._id,
                settings: user.settings,
                data: user.data
            });
        })
        .catch(function(error){
            console.log("hier kommt der error");
            return res.status(500).json({
                title: 'An error occured while signing in',
                error: error
            });
        });
});

router.post('/signup', function (req, res, next) {
    if(req.body.username.indexOf('@') != -1){
        return res.status(400).json({
            title: 'No "@" in username pls',
            error: error
        });
    }
    var user = new User();
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = user.generateHash(req.body.password);
    user.save()
    .then(function(result){
        res.status(201).json({
            message: 'added user',
            object: result
        });
    })
    .catch(function(error){
        return res.status(500).json({
            title: 'An error occured while signing up',
            error: error
        });
    });
});

router.post('/logout', function (req, res, next) {

});

module.exports = router;
