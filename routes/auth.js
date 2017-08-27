var express = require('express');
var router = express.Router();

var User = require('../models/user');

//final url will be host:port/game/...

router.post('/signin', function (req, res, next) {
    User.findOne({username: req.body.username})
        .then(function(user){
            if(!user){
                return res.status(401).json({
                    title: 'login failed',
                    error: {message: 'Invalid login credentials'}
                });
            }
            if(!user.validPassword(req.body.password)){
                return res.status(401).json({
                    title: 'login failed',
                    error: {message: 'Invalid login credentials'}
                });
            }
            
        })
        .catch(function(error){
            return res.status(500).json({
                title: 'An error occured while signing in',
                error: error
            });
        });
});

router.post('/signup', function (req, res, next) {
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
