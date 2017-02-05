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
const Setting = require('../setting/setting.model');


const cfg = require('../cfg');


getSignupCode = function(req, res){
	//if(cfg.signupCode) return cfg.signupCode;

	Setting.findOne({name: 'signupCode'}, function(err, code){
		if(err) throw err;
		res.json(code);
	});

}

exports.getAllItems = function(req, res){
	Item.find(function(err, items){
		if(err)throw err;
		res.json({data: items});

	});
}



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
	// if(cfg.signupCode){
	// 	if(!req.body.signupCode) return res.status(422).json({message: 'In order to limit the number of users of this application a -signupCode- is required in the request. Please provide it!'});
	// 	if(req.body.signupCode != cfg.signupCode) return res.status(401).json({message: 'wrong signupCode'});
	// }
	
	User.findOne({email: req.body.email}, function(err, existingUser){
		if(err) throw err;
		if(existingUser) return res.status(422).send({msg: 'email already in use'});

		let user = new User({
			email: req.body.email,
			password : req.body.password,
			profile : {name: ''}
		});

		// user.save(function(err){
		// 	if(err) throw err;
		// 	res.status(201).json({
	 //          token: generateToken(user),
	 //          user: user
	 //        });
		// });	
		// 
	console.log('new user');
	res.status(201).json({message: 'it works'})

	});
}


exports._postSignUp = function(req, res){

	var validateRequest = new Promise(
		function(resolve,reject){
			Setting.findOne({'name': 'signupCode'}, function(err, setting){
				if(err) throw err;
				if(setting.enabled == true) {
					console.log(setting);
					resolve(setting);
					

				}
				else return res.status(201).json({message: "signupCode not enabled"});
			})


		});

	validateRequest.then(
		function(req, res){


			if(!req.body.email || !req.body.password){
				return res.status(422).json({message: 'Please fill out all fields'});
			}
			if(cfg.signupCode){
				if(!req.body.signupCode) return res.status(422).json({message: 'In order to limit the number of users of this application a -signupCode- is required in the request. Please provide it!'});
				if(req.body.signupCode != cfg.signupCode) return res.status(401).json({message: 'wrong signupCode'});
			}
			
			User.findOne({email: req.body.email}, function(err, existingUser){
				if(err) throw err;
				if(existingUser) return res.status(422).send({msg: 'email already in use'});

				let user = new User({
					email: req.body.email,
					password : req.body.password,
					profile : {name: ''}
				});

				// user.save(function(err){
				// 	if(err) throw err;
				// 	res.status(201).json({
			 //          token: generateToken(user),
			 //          user: user
			 //        });
				// });	
				// 
			console.log('new user');
			res.status(201).json({message: 'it works'})

			});
		}

	);

}










exports.validateSignupCode = function(req, res, next){
	Setting.findOne({'name': 'signupCode'}, function(err, setting){
		if(err) throw err;
		if(setting.enabled == false || !setting) next();
		else {
			if(!req.body.signupCode) return res.status(422).json({message: 'In order to limit the number of users of this application a -signupCode- is required in the request. Please provide it!'});
			if(req.body.signupCode != setting.value) return res.status(401).json({message: 'wrong signupCode'});
			else next();
		}
	});
}




generateToken = function(user) {  
  return jwt.sign(user, cfg.secret, {
    expiresIn: 10080 // in seconds
  });
}

exports.isAuthenticated = function(req, res, next){

	if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'){
		var token = req.headers.authorization.split(' ')[1];
		console.log(token)
	} else {
		var token = req.body.token || req.query.token || req.headers['x-access-token'];
	}
	
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
		return res.status(401).json({message: 'no token provided', headers: req.headers});
	}
}

exports.isAdmin = function(req, res, next){


	if(req.decoded._doc.role ==='Admin'){ 
		next();
	} else {
		res.status(401).json({message: 'the user has no admin rights'});
	}

}






