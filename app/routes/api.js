/**
 * Created by mitrikyle on 4/2/16.
 */

var Dream = require('../models/Dream.js');
var User = require('../models/User.js');

module.exports = function(app,express){
    var apiRouter = express.Router();

// route for getting all dreams
    apiRouter.get('/dreams', function(req,res){
        Dream.find({}, null, {sort: {points: -1}}, function(err,dreams){
            // return the dreams
            res.json(dreams);
        });
    });

    // route for adding a dream
    apiRouter.post('/dreams', function(req,res){
        // create a new instance of dream model
        var dream = new Dream();
        // set the dream info (comes from request)
        dream.user = req.user.id;
        dream.content = req.body.content;
        // save the dream
        dream.save(function(err, newDream){
            if(err){
                return res.send(err);
            }

            // save id reference to user
            req.user.dreams.push(newDream.id);
            //TODO: prevent callback hell (move to schema)
            req.user.save(function (err, updatedUser) {
              if (err) {
                return res.send(err);
              } else {
                res.json({message: 'Dream created'});
              }
            });
        });
    });

    // route to upvote
    apiRouter.route('/dreams/upvote/:dream_id')

        // update the user with that ID
        .put(function(req,res){
            console.log("ZZOMG AN UPVOTE\n");
            Dream.findById(req.params.dream_id, function(err,dream){
                if (err) res.send(err);
                dream.points++;
                // save the dream
                dream.save(function(err) {
                    if (err) res.send(err);

                    // return a message
                    res.json({message: 'Dream updated!'});
                });
            });
        });

    // TODO use user accoutns to prevent dobule voting

    // route to downvote
    apiRouter.route('/dreams/downvote/:dream_id')

        // update the user with that ID
        .put(function(req,res){
            Dream.findById(req.params.dream_id, function(err,dream){
                if (err) res.send(err);
                dream.points--;
                // save the dream
                dream.save(function(err) {
                    if (err) res.send(err);

                    // return a message
                    res.json({message: 'Dream updated!'});
                });
            });
        });


    // route to add dream to user's list
    // may be bad restful api concepts but,
    // fuck that
    apiRouter.post('/dreams/add/:dreamId', function(req,res){
        // add new dream to user's list

        //
        User.update({_id: req.user.id}, { $addToSet: {dreams: req.params.dreamId}}, function (err) {
          console.log(err);
        });

        req.user.save(function (err, updatedUser) {
            if (err) {
                return res.send(err);
            } else {
                console.log('dream added to users list!');
                res.json({message: 'Dream added to users list'});
            }
        });
    });





    return apiRouter;

};
