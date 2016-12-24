//Login 	+
//sign up 	+
//logout 		
//forgot password


const 	async = require('async'),
		crypto = require('crypto'),
		nodemailer = require('nodemailer'),
		passport = require('passport'),
		jwt = require('jsonwebtoken');

const User = require('../user/user.model');
const cfg = require('../cfg');

/**
 * Given valid credentials returns jwt
 * @param  {String} req.body.email
 * @param  {String} res.body.password
 * @return {json}     message, token
 */
exports.postLogin = function(req, res){
	if(!req.body.email || !req.body.password){
		return res.status(400).json({message: 'Please fill out all fields'});
	}

	User.findOne({
		email: req.body.email
	}, function(err, user){
		if(err) throw err;
		if(!user){ res.status(401).json({message: 'no user found', email: req.body.email});
		} else {
			user.verifyPassword(req.body.password, function(err, isMatch){
				if(err) throw err;
				if(!isMatch) {res.status(401).json({message: 'wrong password'});}
				else{
					res.status(201).json({
			          token: generateToken(user),
			          user: user
			        });
				}
			});
		}
	});
}


exports.postSignUp = function(req, res){
	if(!req.body.email || !req.body.password){
		return res.status(422).json({message: 'Please fill out all fields'});
	}
	

	User.findOne({email: req.body.email}, function(err, existingUser){
		if(err) throw err;
		if(existingUser) return res.status(422).send({msg: 'email already in use'});

		let user = new User();
			user.email = req.body.email;
			user.password = req.body.password;

		user.save(function(err){
			if(err) throw err;
			res.status(201).json({
	          token: generateToken(user),
	          user: user
	        });
		});	

	});
	

}



generateToken = function(user) {  
  return jwt.sign(user, cfg.secret, {
    expiresIn: 10080 // in seconds
  });
}

exports.isAuthenticated = function(req, res, next){
	var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['bearer'];

	if(token){
		jwt.verify(token,cfg.secret, function(err, decoded){
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



