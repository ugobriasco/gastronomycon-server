/**
 * PLAN
 * --
router.route('/user')
	.get(userCtrl.getAllUsers)
	.post(userCtrl.postUser);
router.route('/user/:objID')
	.get(userCtrl.getUser);
	.post(userCtrl.postUser);
	.put(userCtrl.updateUser);
	.delete(userCtrl.deleteUser);


 */

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

exports.getAllUsers = function(req,res){
	User.find(function(err, users){
		if(err) throw err;
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