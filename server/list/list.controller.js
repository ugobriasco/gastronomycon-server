const List = require('./list.model');
const User = require('../user/user.model');


//Create a new list
exports.postList = (req, res) => {
	const list = new List();

	let message = 'list created';

	req.body.ownerID 
	? list.ownerID = req.body.ownerID
	: res.status(400).send({message: 'no ownerID defined'});

	req.body.data 
	? list.items.push(req.body.data) 
	: message = 'empty list created';

	list.save(function(err){
		if(err) res.status(500).send(err);
		res.json({message: message, data: list});
	});
}

//query all list saved (admin function)
exports.getAllLists = (req, res) => {
	List.find(function(err, lists){
		if(err) res.status(500).send(err);
		res.json({data: lists});
	});
}

//loads the list fro the database
exports.loadList = (req, res, next) => {
  List.findById(req.params.objID)
    .exec()
    .then((list) => {
      if (!list) {
        return res.status(404).send({
          message: "List not found"
        });
      }
      req.dbList = list;
      return next();
    }, (e) => next(e));
}

// get a list given its _id - requires loadList
exports.getList = (req, res) => {
	if(req.dbList) res.json({data: req.dbList});
}


//deleta a given list
exports.deleteList = (req, res) => {
	List.findByIdAndRemove(req.params.objID, function(err){
		if(err) res.status(500).send(err);
		res.json({message: 'List '+req.params.objID+' removed'})
	});
}

exports.replaceListItems = (req, res) => {
	if(req.dbList){
		req.dbList.items.splice(0,req.dbList.items.length, req.body);
		Object.assign(req.dbList, req.body.data).save((err, list) => {
			if(err) res.status(500).send(err);
			res.json({ message: 'List updated!', list });
		});
	}
}
exports.isListOwner = function(req, res, next){
	if(
		req.decoded._doc.role === 'Admin' ||
		req.decoded._doc.role === dbList.ownerID
	) next();
	else{
		res.status(401).send({
			message: 'the user has not the rights'
		});
	}
}

// //share a list 
	// exports.shareList = (req, res) => {

	// 	List.findById(req.params.objID,(err, list) => {
	// 		if(err) res.status(404).send(err);
	// 		if(!list) res.status(404).send({message: 'No list found'});
	// 		if(!req.body.userID) res.status(422).send({message: 'No userID provided'});
	// 		//if(!req.body.userID.match(/^[0-9a-fA-F]{24}$/)) res.status(422).send({message: 'No user founf'});

			

	// 		// User.findById(req.body.userID, (err, res, next) =>{
	// 		// 	if(err) res.status(404).send(err);
	// 		// 	else list.allowedUsers.push(res._id);
	// 		// 	next();
	// 		// });

	// 		list.allowedUsers.push(req.body.userID);


	// 		Object.assign(list, req.body).save((err, list) => {
	// 			if(err) res.send(err);
	// 			res.json({ message: 'List updated!', list });
	// 		});

	// 	});
	// }

// exports.unshareList = (req, res) => {
	
// }

