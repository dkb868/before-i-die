var passport = require('passport')
	, LocalStrategy = require('passport-local').Strategy;

var User = require('../models/User.js');
module.exports = function(passport) {
	  // used to serialize the user for the session
		passport.serializeUser(function(user, done) {
		  done(null, user.id);
		});
		// used to deserialize the user
		passport.deserializeUser(function(id, done) {
			User.findById(id , function(err, user) {
				done(err, user);
			});
	  });

		passport.use(new LocalStrategy({
		  usernameField: 'email',
			passwordField: 'password' },
			function(username, password, done) { User.findOne({ email: username },
			function (err, user) {
				if (err) { return done(err); }
				if (!user) {
					return done(null, false, { message: 'Incorrect email.' });
				}
				if (!user.validPassword(password)) {
					return done(null, false, { message: 'Incorrect password.' });
				}
					return done(null, user); });
			}
		));



};
