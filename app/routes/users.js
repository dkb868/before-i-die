

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

  apiRouter.get('/dreams/:userId', function (req ,res , next) {
    User.findOne({_id:req.params.userId})
      .populate("dreams")
      .exec(function (err, user) {
        if (user) {
          res.status(200).json({
            status: true,
            dreams: user.dreams,
            message: "Takes your dreams baby",
          });
        } else {
          res.status(401).json({
            status: false,
            dreams: undefined,
            message: "We couldn't find those dreams for this user.",
            error: err,
          });
        }
      });
  });

//TODO: I DON"T NEED YOUR SASS
  apiRouter.post('/createAccount', function (req, res, next) {
    var newUser = User();
    console.log("EMAIL: " + req.body.email);
    newUser.email = req.body.email;
    newUser.password = hashUserPassword(req.body.password);
    newUser.save(function (err) {
      if (err) {
        res.status(401).json({
          status: false,
          user: undefined,
          message: err,
        });
      } else {
        res.status(200).json({
          status:true,
          user: newUser,
          message:"Account successfully created!",
        });
      }
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
