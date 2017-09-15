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
	.get(itemCtrl.queryItems)
router.route('/item/:objID')
	.get(itemCtrl.getItem)
	.put(authCtrl.isAuthenticated, itemCtrl.putItem)
	.delete(authCtrl.isAuthenticated, itemCtrl.deleteItem);
	
router.route('/user')
	.get(
		authCtrl.isAuthenticated, 
		authCtrl.isAdmin,
		userCtrl.getAllUsers
	);
	
router.route('/user/:objID')
	.get(
		authCtrl.isAuthenticated, 
		authCtrl.isAccountOwner, 
		userCtrl.getUser
	)
	.put(
		authCtrl.isAuthenticated,
		authCtrl.isAccountOwner, 
		userCtrl.updateUser
	)
	.delete(
		authCtrl.isAuthenticated, 
		authCtrl.isAccountOwner, 
		userCtrl.deleteUser
	);


router.route('/login')
	.post(authCtrl.postLogin);
router.route('/signup')
	.post(authCtrl.validateSignupCode,authCtrl.postSignUp);
router.route('/reset/:token')
	.post(authCtrl.postReset);
router.route('/forgot')
	.post(authCtrl.postForgot);



router.route('/settings')
	.post(authCtrl.isAuthenticated, authCtrl.isAdmin, settingCtrl.postSetting)
	.get(authCtrl.isAuthenticated, authCtrl.isAdmin,settingCtrl.getAllSettings);
router.route('/settings/:name')
	.get(authCtrl.isAuthenticated, authCtrl.isAdmin, settingCtrl.getSetting)	
	.put(authCtrl.isAuthenticated, authCtrl.isAdmin, settingCtrl.putSetting);
router.route('/settings/:objID')
	.delete(authCtrl.isAuthenticated, authCtrl.isAdmin,settingCtrl.deleteSetting);


router.get('/', function(req, res){
	res.json({message: 'Welcome in Grocerybot, the datasource of your multilingual grocery applications, following the api documentation', apiDoc});
});

router.all('*', function(req, res){
	res.status(404).send({message: '** no hunicorns here**'});
});

module.exports = router;
