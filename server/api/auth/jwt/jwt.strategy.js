var User = require('../../user/user.model');
var jwt = require('jsonwebtoken');

// given login credentials, returns jwt
exports.postLogin = function(req, res){
	User.findOne({
		username: req.body.username
	}, function(err, user){

		if(err) throw err;
		if(!user){ res.status(401).json({message: 'no user foundo', username: user}); }

		user.verifyPassword(req.body.password, function(err, isMatch){
			if(err) throw err;
			if(!isMatch) {res.status(401).json({message: 'wrong password'});}
			else{

				var token = jwt.sign(user, 'superSecret', {
					expiresIn: 1400
				});

				res.status(200).json({
					message: 'Enjoy the token',
					token: token

				});

			}

			

		});

	});
}


//access via jwt
exports.isAuthenticated = function(req, res, next){

	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	if(token){
		jwt.verify(token,'superSecret', function(err, decoded){
			if(err){res.status(401).json({message: 'Failed autenthicate token'});}
			else{
				req.decoded = decoded;
				next();
			}

		});
	}
	else {
		return res.status(401).json({message: 'no token provided'});
	}

}