const express = require('express');
const validate = require('express-validation');

const itemCtrl = require('../item/item.controller');
const itemVal = require('../item/item.validation');

const userCtrl = require('../user/user.controller');
const userVal = require('../user/user.validation');

const authCtrl 	= require('../auth/auth.controller');
const settingCtrl =require('../setting/setting.controller');
const listCtrl = require('../list/list.controller');
const apiDoc = require('./api-doc.json');

const router=express.Router();

router.get('/', function(req, res){
	res.json({message: 'Welcome in Grocerybot, the datasource of your multilingual grocery applications, following the api documentation', apiDoc});
});




router.route('/item')
	.post(
		validate(itemVal.postItem), 
		authCtrl.isAuthenticated, 
		itemCtrl.postItem
	)
	.get(
		validate(itemVal.queryItems), 
		itemCtrl.queryItems
	);
router.route('/item/:objID')
	.get(
		validate(itemVal.getItem),
		itemCtrl.getItem
	)
	.put(
		validate(itemVal.updateItem),
		authCtrl.isAuthenticated, 
		itemCtrl.updateItem
	)
	.delete(
		validate(itemVal.deleteItem),
		authCtrl.isAuthenticated,
		itemCtrl.deleteItem
	);

	
router.route('/user')
	.get(
		authCtrl.isAuthenticated, 
		authCtrl.isAdmin,
		userCtrl.getAllUsers
	);
router.route('/user/:objID')
	.get(
		validate(userVal.getUser), 
		authCtrl.isAuthenticated, 
		authCtrl.isAccountOwner,
		userCtrl.getUser
	)
	.put(
		validate(userVal.updateUser), 
		authCtrl.isAuthenticated,
		authCtrl.isAccountOwner,
		userCtrl.updateUser
	)
	.delete(
		validate(userVal.deleteUser), 
		authCtrl.isAuthenticated, 
		authCtrl.isAccountOwner,	
		userCtrl.deleteUser
	);

router.route('/list')
	.get(listCtrl.getAllLists)
	.post(listCtrl.postList);
router.route('/list/:objID')
	.delete(listCtrl.deleteList)
	.put(listCtrl.replaceListItems);
// router.route('/list/share/:objID')
// 	.post(listCtrl.shareList);
// router.route('/list/:objID/unshare')
// 	.post(listCtrl.unshareList);


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



router.all('*', function(req, res){
	res.status(404).send({message: '** no hunicorns here**'});
});




module.exports = router;
