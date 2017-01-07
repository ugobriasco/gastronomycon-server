var express = require('express');

var itemCtrl		= require('../item/item.controller'),
	userCtrl 		= require('../user/user.controller'),
	//basicAuthCtrl 	= require('../auth/basic/basic.controller'),
	jwtAuthCtrl 	= require('../auth/auth.controller');


var router=express.Router();

router.route('/item')
//.post(jwtAuthCtrl.isAuthenticated ,itemCtrl.postItem)
//.get(jwtAuthCtrl.isAuthenticated ,itemCtrl.getItems);
.post(itemCtrl.postItem)
.get(itemCtrl.getItems);

router.route('/item/:objID')
.get(itemCtrl.getItem)
.put(itemCtrl.putItem)
.delete(itemCtrl.deleteItem)

router.route('/user')
	.get(userCtrl.getAllUsers)
	.post(userCtrl.postUser);
router.route('/user/:objID')
	.get(userCtrl.getUser)
	.post(userCtrl.postUser)
	.put(userCtrl.updateUser)
	.delete(userCtrl.deleteUser);

router.route('/login')
.post(jwtAuthCtrl.postLogin);

router.route('/signup')
.post(jwtAuthCtrl.postSignUp);



router.get('/', function(req, res){
	res.json({message: 'Hello world'});
});

module.exports = router;
