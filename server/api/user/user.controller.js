var User = require('./user.model');

exports.postUser = function(req, res){
	var user = new User({
		username: req.body.username,
		password: req.body.password
	});

	user.save(function(err){
		if(err) throw err;
		res.json({message: "new user"});
	});
}

exports.getUsers = function(req,res){
	User.find(function(err, users){
		if(err) throw err;
		res.json(users);
	});
}