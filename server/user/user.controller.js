var User = require('./user.model');

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
		if(err) throw err;
        var magic = new Date().toISOString();
        console.log(magic);
		res.json(users);
	});
}

exports.getUser = function(req, res) {
    User.findById(req.params.objID, (err, user) => {
        if(err) res.send(err);
        res.json(user);
    });     
}

exports.updateUser = function(req, res) {
    User.findById({_id: req.params.objID}, (err, user) => {
        if(err) res.send(err);
        Object.assign(user, req.body).save((err, user) => {
            if(err) res.send(err);
            res.json({ message: 'User updated!', user });
        }); 
    });
}

exports.deleteUser = function(req, res) {
    var objID = req.params.objID;
    var update = req.body;

    User.findByIdAndRemove(objID, update, function(err, user){
        if(err) res.send(err);
        res.json("user: " +objID +' removed');
    });
}