var express = require('express');
var router = express.Router();

var ShoutOut = require('../models/shoutout')
var User = require('../models/user')

router.get('/', function (req, res, next) {
    res.render('index');
});

router.post('/', function (req, res, next) {
    var email = req.body.email;
    var user = new User({
        local: {
            username: 'tollolol',
            password: 'lol',
            email: email
        }
    });
    user.save(function(err){
        if(!err){
            console.log('saved')
        } else {
            console.log(err);
        }
    });
    res.redirect('/');
});

module.exports = router;
