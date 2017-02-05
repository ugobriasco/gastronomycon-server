var express = require('express');

var itemCtrl		= require('../item/item.controller'),
	userCtrl 		= require('../user/user.controller'),
	//basicAuthCtrl 	= require('../auth/basic/basic.controller'),
	jwtAuthCtrl 	= require('../auth/auth.controller');
	settingCtrl 	=require('../setting/setting.controller');


var router=express.Router();

router.route('/item')
	.post(jwtAuthCtrl.isAuthenticated, itemCtrl.postItem)
	.get(itemCtrl.getAllItems);
router.route('/item/:objID')
	.get(itemCtrl.getItem)
	.put(jwtAuthCtrl.isAuthenticated, itemCtrl.putItem)
	.delete(jwtAuthCtrl.isAuthenticated, itemCtrl.deleteItem);
	
router.route('/user')
	.get(jwtAuthCtrl.isAuthenticated, jwtAuthCtrl.isAdmin ,userCtrl.getAllUsers);
router.route('/user/:objID')
	.get(jwtAuthCtrl.isAuthenticated, userCtrl.getUser)
	.put(jwtAuthCtrl.isAuthenticated ,userCtrl.updateUser)
	.delete(userCtrl.deleteUser);

router.route('/login')
	.post(jwtAuthCtrl.postLogin);

router.route('/signup')
	.post(jwtAuthCtrl.validateSignupCode,jwtAuthCtrl.postSignUp);

router.route('/settings')
	.post(settingCtrl.postSetting)
	.get(settingCtrl.getAllSettings);
router.route('/settings/:name')
	.get(settingCtrl.getSetting)	
	.put(settingCtrl.putSetting);
router.route('/settings/:objID')
	.delete(settingCtrl.deleteSetting);


router.get('/', function(req, res){
	res.json({message: 'Hello world'});
});

module.exports = router;
