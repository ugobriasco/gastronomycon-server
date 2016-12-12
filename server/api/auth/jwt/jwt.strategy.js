var User = require('../../user/user.model');
var jwt = require('jsonwebtoken');


exports.postLogin = function(req, res){
	User.findOne({
		username: req.body.username
	}, function(){

		if(err) throw err;
		if(!user){ res.status(501).json({message: 'no user found'}); }

		user.verifyPassword(req.body.password, function(err, isMatch){
			if(err) throw err;
			if(!isMatch) {res.status(502).json({message: 'wrong password'});}
			else{

				var token = jwt.sign(user, 'superSecret', {
					expiresInMinutes: 1400
				});

				res.status(200).json({
					success: true,
					message: 'Enjoy the token',
					token: token

				});

			}

			

		});

	});
}