

// /api/users/ ROUTE//
module.exports = function(app,express){
  var apiRouter = express.Router();
  var User = require("../models/User.js");

	apiRouter.get('/', function (req,res,next){
    User.find({})
      .exec(function (err, users) {
        res.json({
          status: true,
          users: users,
          message:"All users fetched!",
        });
      });
	});

	apiRouter.get('/:userId', function (req, res, next){
    User.findOne({_id:req.params.userId})
      .exec(function (err, user) {
        var status, userFound, message;
        if (user) {
          status = true;
          userFound = user;
          message = "User found!";
        } else {
          status = false;
          userFound = undefined;
          message = err;
        }

        res.json({
          status: status,
          user: user,
          message: message,

        });
      });
	});

  // TODO whyy doesn't createAccount deal with failure?
  apiRouter.post('/createAccount', function (req, res, next) {
    var newUser = User();
    console.log("EMAIL: " + req.body.email);
    newUser.email = req.body.email;
    newUser.password = hashUserPassword(req.body.password);
    newUser.save();

    res.status(200).json({
      status:true,
      message:"Account successfully created!",
      user: newUser,
    });

  });

  var salt = 'imsaltyaf7';
  var Crypto = require('crypto');
  function hashUserPassword(password) {
    return Crypto
      .createHash('sha1')
      .update(salt + password + salt)
      .digest("hex")
      .substring(0,6);
  };



  return apiRouter;
};
