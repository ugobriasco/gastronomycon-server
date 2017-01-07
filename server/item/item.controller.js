var Item = require('./item.model');


//endpoint for api/items

exports.postItem = function(req, res){
	var item = new Item();
	item.type = req.body.item.type;
	item.name = req.body.item.name;

	item.save(function(err){
		if(err)throw err;
		res.json({message: 'item added', data: item});

	});
}

exports.getItems = function(req, res){

	Item.find(function(err, items){
		if(err)throw err;
		res.send(items);

	});
}

exports.getItem = function(req, res){
	Item.findById(req.params.objID, function(err, item){
		if(err) throw err;
		res.json(item);

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

		item.name = req.body.name;
		item.quantity = req.body.quantity;

		item.save(function(err){
			if(err) throw err;
			res.json(item);

		});
	});

}





