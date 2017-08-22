var express = require('express');
var router = express.Router();

//final url will be host:port/game/...

router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/app/message/:msg', function (req, res, next) {
    res.render('node', {message: req.params.msg});
});

router.post('/app/message', function (req, res, next) {
    var message = req.body.message;
    res.redirect('/message/' + message);
});

module.exports = router;
