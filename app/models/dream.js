/**
 * Created by mitrikyle on 4/2/16.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DreamSchema = new Schema({
    content: String,
    date: { type: Date, default: Date.now},
    points: {type: Number, default: 0}
});

// return the model

module.exports = mongoose.model('Dream', DreamSchema);