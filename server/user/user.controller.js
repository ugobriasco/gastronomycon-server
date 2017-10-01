const User = require('./user.model');

exports.postUser = function(req, res){
	// var user = new User({
	// 	email: req.body.email,
	// 	password: req.body.password
	// });

	// user.save(function(err){
	// 	if(err) throw err;
	// 	res.json({message: "new user"});
	// });
    res.status(401).json({meassge: "This route is deprecated"});
}

exports.getAllUsers = function(req,res){
	User.find(function(err, users){
		if(err) res.status(500).send(err);
		res.json({data: users});
	});
}

exports.getUser = function(req, res) {
    User.findById(req.params.userID, (err, user) => {
        if(err) res.status(500).send(err);
        if(!user) res.status(404).send({message: 'No user found'});
        else res.json({data: user});
        
    });
}

//to refactor: a put can modify everything
exports.updateUser = function(req, res) {
    User.findById(req.params.userID, (err, user) => {
        if(err) res.status(500).send(err);
        if(!user) res.status(404).send({message: 'No user found'});
        Object.assign(user, req.body).save((err, user) => {
            if(err) res.status(500).send(err);
            res.json({ message: 'User updated!', user });
        }); 
    });   
}

exports.deleteUser = function(req, res) {
    const userID = req.params.userID;

    User.findByIdAndRemove(userID, function(err, user){
        if(err) res.status(500).send(err);
        if(!user) res.status(404).send({message: 'No user found'});
        else res.json("user: " +userID +' removed');
    });
}


