
// /api/auth/ ROUTE//
module.exports = function(app,express){
  var passport = require('passport');
  var User = require('../models/User.js');
  require('../config/passport.js')(passport);

  var apiRouter = express.Router();

	apiRouter.get('/', function (req,res,next){

	});

	apiRouter.post('/login',
    passport.authenticate('local'),
    function (req, res, next){
      if (req.user) {
        res.status(200).json({
          status: true,
          user: req.user,
          message: "Logged in!",
        });
      } else {
        res.status(401).json({
          status: false,
          user: undefined,
          message: "Invalid email or password",
        });
      }
    }
  );

	apiRouter.get('/logout', function (req, res, next) {
    req.logout();
    res.status(200).json({
      status: true,
      message: "Logged out!",
    });
	});


	return apiRouter;
};
