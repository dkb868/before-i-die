/**
 * Created by mitrikyle on 4/2/16.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DreamSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "User"},
    content: String,
    date: { type: Date, default: Date.now},
    points: {type: Number, default: 0}
});

DreamSchema.statics.createDream = function(user, noInverse) {

}

// return the model
module.exports = Dream = mongoose.model('Dream', DreamSchema);
