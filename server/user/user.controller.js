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
		res.json({data: users});
	});
}

exports.getUser = function(req, res) {
    if (req.params.objID.match(/^[0-9a-fA-F]{24}$/)) {
        User.findById(req.params.objID, (err, user) => {
            if(err) res.status(404).send(err);
            if(!user) res.status(404).send({message: 'No user found'});
            else res.json({data: user});
            
        });
    } else {
       res.status(404).send({message: 'No user no user found'});
    }
         
}

exports.updateUser = function(req, res) {
    if(req.params.objID.match(/^[0-9a-fA-F]{24}$/)){
         User.findById(req.params.objID, (err, user) => {
            if(err) res.status(404).send(err);
            if(!user) res.status(404).send({message: 'No user found'});
            Object.assign(user, req.body).save((err, user) => {
                if(err) res.send(err);
                res.json({ message: 'User updated!', user });
            }); 
        });
    } else {
        res.status(404).send({message: 'No user no user found'});
    }
   
}


exports.deleteUser = function(req, res) {
    var objID = req.params.objID;
    var update = req.body;

    User.findByIdAndRemove(objID, update, function(err, user){
        if(err) res.send(err);
        res.json("user: " +objID +' removed');
    });
}
