/**
 * Created by willgu 4/27/16
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: String,
    password: String,
    dateCreated: { type: Date, default: Date.now},
    dreams: [{type: mongoose.Schema.Types.ObjectId, ref: 'Dream'}],
    
});

// return the model

module.exports = mongoose.model('User', UserSchema);
