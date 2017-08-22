// config/jimp.js
// this function should take an image and cut it into small pieces
// I wanted this as a background animation for the login screen

var Jimp = require('jimp');

module.exports = function (imgPath, callback {

var imageCuts;

	//read an image from imgPath and cut it into pieces for hexagon animation
	Jimp.read(imgPath, function(err, img){
		if(err) return err;

		//TODO Cut image

		callback(imageCuts);
	});

}
