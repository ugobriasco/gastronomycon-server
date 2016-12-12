var passport 	= require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt 	= require('passport-jwt').ExtractJwt;
var jwt 		= require('jsonwebtoken');

var basicAuthCtrl = require('../basic/basic.controller');

var opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = 'secret';

passport.use(new JwtStrategy(opts, function(jwt_payload, done){
	User.findOne({ username: username}, function(err, user){
		if (err){ return done(err, false);}
		if (user){ return done(null, user);}
		else { done(null, false) }
	});

}));


exports.postLogin = function(req, res, next) {
  passport.authenticate('jwt', function(err, user, info) {
    if (err) throw err;
    if (!user) {
        return res.status(401).json({ msg: 'no user found' });
    }
    req.logIn(user, function(err) {
        if (err) throw err;
        var secretOrKey = jwtOptions.secretOrKey;
        var token = jwt.sign(user, secretOrKey, {
            expiresIn: 631139040 // 20 years in seconds
        });
        res.send({ user: user, jwtToken: "JWT " + token });
    });
  })(req, res, next);
};

		