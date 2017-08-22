var express = require('express');
var router = express.Router();
var Promise = require('bluebird');

var ShoutOut = require('../models/shoutout')
var User = require('../models/user')

router.get('/', function (req, res, next) {
    ShoutOut.find().exec()
        .then(function(shoutouts) {
            res.status(200).json({
                message: 'found shoutouts',
                objects: shoutouts
            });
        })
        .catch(function(err) {
            return res.status(500).json({
                title: 'An error occured while getting shoutouts',
                error: err
            });
        });
});

router.post('/', function (req, res, next) {
    var shoutout = new ShoutOut ({
        content: req.body.content
    });
    shoutout.save()
    .then(function(result){
        res.status(201).json({
            message: 'added shoutout',
            object: result
        });
    })
    .catch(function(err){
        return res.status(500).json({
            title: 'An error occured while posting',
            error: err
        });
    })
});

router.patch('/test', function (req, res, next){
    var data = 'here comes the data';
    var testPromise = new Promise(function (resolve, reject) {
        resolve();
    })
    .then(function(result){

        if(veryBadTypo){}

    })
    .catch(function(err){
        //console.log(err);
        return res.status(500).json({
            title: 'This will fire if there is an error in the then-function',
            error: {message: 'but the node.js app will only crash if I log the error'}
        });
    });
});

router.patch('/:id', function (req, res, next) {
    var query = ShoutOut.findOne({ _id: req.params.id });
    ShoutOut.findById(req.params.id).exec()
    .then(function(shoutout){
        if(!shoutout){
            return res.status(500).json({
                title: 'No Shoutout found',
                error: { message: 'shoutout not found' }
            });
        }
        shoutout.content = req.body.content;
        return shoutout.save()
    })
    .then(function(result){
        res.status(200).json({
            message: 'updated shoutout',
            object: result
        });
    })
    .catch(function(error){
        return res.status(500).json({
            title: 'Error while updating the shoutout',
            error: error
        });
    });
});

router.delete('/:id', function (req, res, next) {
    var query = ShoutOut.findOne({ _id: req.params.id });
    ShoutOut.findById(req.params.id).exec()
    .then(function(shoutout){
        if(!shoutout){
            return res.status(500).json({
                title: 'No Shoutout found',
                error: { message: 'shoutout not found' }
            });
        }
        shoutout.content = req.body.content;
        return shoutout.remove()
    })
    .then(function(result){
        res.status(200).json({
            message: 'removed shoutout',
            object: result
        });
    })
    .catch(function(error){
        return res.status(500).json({
            title: 'Error while deleting the shoutout',
            error: error
        });
    });
});

module.exports = router;
