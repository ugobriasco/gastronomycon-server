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

generateToken = function(user) {  
  return jwt.sign(user, cfg.secret, {
    expiresIn: 10080 // in seconds
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
	User.findOne({email: req.body.email}, function(err, existingUser){
		if(err) throw err;
		if(existingUser) return res.status(422).send({msg: 'email already in use'});

		let user = new User({
			email: req.body.email,
			password : req.body.password,
			profile : {name: ''}
		});

		user.save(function(err){
			if(err) throw err;
			res.status(201).json({
	          token: generateToken(user),
	          user: user
	        });
		});	
		
	console.log('new user');
	res.status(201).json({message: 'it works'})

	});
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


//psw management


exports.postUpdatePassword = (req, res, next) => {
	if(!req.body.email){
		return res.status(400).json({message: 'Please fill out all fields'});
	}

	User.findOne({email: req.body.email}, (err, user) => {
		if(err) return next(err);
		if(!user){ res.status(401).json({message: 'no user found', email: req.body.email});
		} else {
			user.password = req.body.password;
			user.save((err) => {
				if(err) return next(err);
				res.status(201).json({msg: 'password has been changed'});
			});
		}
	});




}



exports.postForgot = (req, res, next) => {
	async.waterfall([
		function createRandomToken(done){
			crypto.randomBytes(16, (err, buf) => {
				const token = buf.toString('hex');
				done(err, token);
			});
		},
		function setRandomToken(token, done){
			User.findOne({ email: req.body.email}, (err, user) => {
				if(err) return done(err);
				if(!user) return res.status(422).send({msg: 'this email does not exit'});

				user.passwordResetToken = token;
				user.passwordResetExpires = Date.now() +36000000;
				user.save((err) => {
					done(err, token, user);
				});

				}
			})
		},
		function sendForgotPasswordEmail(token, user, done){
			const transporter = nodemailer.createTransport({
				service: 'sendGrid',
				auth: {
					user: process.env.SENDGRID_USER
					pass: process.env.SENDGRID_PASSWORD
				}

			});
			const mailOptions = {
				to: user.email,
				from: 'noreply@matchyourtie.com',
				subject: 'Reset your password on Grocerybot',
				text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
          Please click on the following link, or paste this into your browser to complete the process:\n\n
          http://${req.headers.host}/reset/${token}\n\n
          If you did not request this, please ignore this email and your password will remain unchanged.\n`
			};
			transporter.sendMail(mailOptions, (err) => {
				res.json({message: `An e-mail has been sent to ${user.email} with further instructions.`});
				done(err);
			});
		} 

	],(err) => {
			if(err) return next(err);
	});
}






//stati


exports.isAuthenticated = function(req, res, next){

	if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'){
		var token = req.headers.authorization.split(' ')[1];
		
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






