var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user');

var schema = new Schema({
    content: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

schema.post('remove', function(shoutout) {
    User.findById(shoutout.user)
        .then(function(user) {
            user.shoutouts.pull(shoutout);
            user.save();
        });
})

module.exports = mongoose.model('ShoutOut', schema);
