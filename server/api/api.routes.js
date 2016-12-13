var express = require('express');

var itemCtrl		= require('./item/item.controller'),
	userCtrl 		= require('./user/user.controller'),
	basicAuthCtrl 	= require('./auth/basic/basic.controller'),
	jwtAuthCtrl 	= require('./auth/jwt/jwt.strategy');


var router=express.Router();

router.route('/items')
//.post(basicAuthCtrl.isAuthenticated ,itemCtrl.postItem)
//.get(basicAuthCtrl.isAuthenticated ,itemCtrl.getItems);
.post(jwtAuthCtrl.isAuthenticated ,itemCtrl.postItem)
.get(jwtAuthCtrl.isAuthenticated ,itemCtrl.getItems);

router.route('/items/:objID')
.get(itemCtrl.getItem)
.put(itemCtrl.putItem)
.delete(itemCtrl.deleteItem)

router.route('/users')
.get(userCtrl.getUsers)
.post(userCtrl.postUser);

router.route('/login')
.post(jwtAuthCtrl.postLogin);



router.get('/', function(req, res){
	res.json({message: 'Hello world'});
});

module.exports = router;


