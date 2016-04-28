

// /api/users/ ROUTE//
module.exports = function(app,express){
  var Crypto = require('crypto');
  var apiRouter = express.Router();
  var salt = 'imsaltyaf7';
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

  apiRouter.post('/createAccount', function (req, res, next) {
    var newUser = User();
    newUser.email = req.body.email;
    newUser.password = hashUserPassword(req.body.password);
    newUser.save();

    res.json({
      status:true,
      message:"Account successfully created!",
    });

  });

  function hashUserPassword(password) {
    return Crypto
      .createHash('sha1')
      .update(salt + password + salt);
      .digest("hex")
      .substring(0,6);
  };

	return apiRouter;
};
