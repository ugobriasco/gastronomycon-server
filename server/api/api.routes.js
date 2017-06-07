var express = require('express');

var itemCtrl		= require('../item/item.controller'),
	userCtrl 		= require('../user/user.controller'),
	//basicuthCtrl 	= require('../auth/basic/basic.controller'),
	authCtrl 	= require('../auth/auth.controller');
	settingCtrl 	=require('../setting/setting.controller');
	apiDoc = require('./api-doc.json');

//todo set productive routes

var router=express.Router();

router.route('/item')
	.post(authCtrl.isAuthenticated, itemCtrl.postItem)
	.get(itemCtrl.getAllItems);
router.route('/item/:objID')
	.get(itemCtrl.getItem)
	.put(authCtrl.isAuthenticated, itemCtrl.putItem)
	.delete(authCtrl.isAuthenticated, itemCtrl.deleteItem);
	
router.route('/user')
	.get(authCtrl.isAuthenticated, authCtrl.isAdmin ,userCtrl.getAllUsers);
	//.get(userCtrl.getAllUsers);
router.route('/user/:objID')
	.get(authCtrl.isAuthenticated, userCtrl.getUser)
	.put(authCtrl.isAuthenticated ,userCtrl.updateUser)
	.delete(userCtrl.deleteUser);

router.route('/login')
	.post(authCtrl.postLogin);
router.route('/signup')
	.post(authCtrl.validateSignupCode,authCtrl.postSignUp);
router.route('/reset/:token')
	.post(authCtrl.postReset);
router.route('/forgot')
	.post(authCtrl.postForgot);



router.route('/settings')
	.post(settingCtrl.postSetting)
	.get(settingCtrl.getAllSettings);
router.route('/settings/:name')
	.get(settingCtrl.getSetting)	
	.put(settingCtrl.putSetting);
router.route('/settings/:objID')
	.delete(settingCtrl.deleteSetting);


router.get('/', function(req, res){
	res.json({message: 'Welcome in Grocerybot, the datasource of your multilingual grocery applications, following the api documentation', apiDoc});
});

module.exports = router;
