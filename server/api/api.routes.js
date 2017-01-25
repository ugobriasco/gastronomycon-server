var express = require('express');

var itemCtrl		= require('../item/item.controller'),
	userCtrl 		= require('../user/user.controller'),
	//basicAuthCtrl 	= require('../auth/basic/basic.controller'),
	jwtAuthCtrl 	= require('../auth/auth.controller');


var router=express.Router();

router.route('/item')
	.post(jwtAuthCtrl.isAuthenticated, itemCtrl.postItem)
	.get(itemCtrl.getAllItems);
router.route('/item/:objID')
	.get(itemCtrl.getItem)
	.put(jwtAuthCtrl.isAuthenticated, itemCtrl.putItem)
	.delete(jwtAuthCtrl.isAuthenticated, itemCtrl.deleteItem);
	
router.route('/user')
	.get(userCtrl.getAllUsers);
router.route('/user/:objID')
	.get(jwtAuthCtrl.isAuthenticated, userCtrl.getUser)
	.put(jwtAuthCtrl.isAuthenticated ,userCtrl.updateUser)
	.delete(jwtAuthCtrl.isAuthenticated ,userCtrl.deleteUser);

router.route('/login')
	.post(jwtAuthCtrl.postLogin);

router.route('/signup')
	.post(jwtAuthCtrl.postSignUp);



router.get('/', function(req, res){
	res.json({message: 'Hello world'});
});

module.exports = router;
