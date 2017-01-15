var Item = require('./item.model');


//endpoint for api/items

exports.postItem = function(req, res){
	var item = new Item();
	item.type = req.body.type;
	item.pic = req.body.pic;
	item.name = req.body.name;

	//ToDo robust input validation, as an inconsistant data will crash the client

	item.save(function(err){
		if(err)throw err;
		res.json({message: 'item added', data: item});

	});
}

exports.getAllItems = function(req, res){
	Item.find(function(err, items){
		if(err)throw err;
		res.json({data: items});

	});
}

exports.getItem = function(req, res){
	Item.findById(req.params.objID, function(err, item){
		if(err) throw err;
		res.json({data: item});

	});
}

exports.deleteItem = function(req, res){
	Item.findByIdAndRemove(req.params.objID, function(err){
		if(err) throw err;
		res.json({message: 'Item '+req.params.objID+' removed'})

	});
}

exports.putItem = function(req, res){
	Item.findById(req.params.objID, function(err, item){
		if(err)throw err;

		item.type = req.body.type;
		item.pic = req.body.pic;
		item.name = req.body.name;

		item.save(function(err){
			if(err) throw err;
			res.json(item);

		});
	});


	exports.updateUser = function(req, res) {
    User.findById({_id: req.params.objID}, (err, user) => {
        if(err) res.send(err);
        Object.assign(user, req.body).save((err, user) => {
            if(err) res.send(err);
            res.json({ message: 'User updated!', user });
        }); 
    });
}

}





