var passport = require('passport');
var User = require('../models/User.js');


// /api/auth/ ROUTE//


module.exports = function(app,express){
  require('../config/passport')(passport);
  var apiRouter = express.Router();

	apiRouter.get('/', function (req,res,next){

	});

	apiRouter.post('/login', function (req, res, next){
    passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
	});

	apiRouter.get('/logout', function (req, res, next) {

	});


	return apiRouter;
};
