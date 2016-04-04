/**
 * Created by mitrikyle on 4/2/16.
 */

var Dream = require('../models/dream');

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
        // create a new instance of draem model
        var dream = new Dream();
        // set the dream info (comes from request)
        dream.content = req.body.content;
        // save the dream
        dream.save(function(err){
            if(err){
                return res.send(err);
            }
            res.json({message: 'Dream created'});
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



    return apiRouter;

};