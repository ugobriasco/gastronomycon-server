//vendor
var express 	= require('express'),
	mongoose 	= require('mongoose'),
	bodyParser 	= require('body-parser'),
	passport 	= require('passport');
	
	


//lib
var itemCtrl		= require('./server/api/item/item.controller'),
	userCtrl 		= require('./server/api/user/user.controller'),
	basicAuthCtrl 	= require('./server/api/auth/basic/basic.controller');
	jwtAuthCtrl 	= require('./server/api/auth/jwt/jwt.controller');



//config
var app			= express(),
	port 		= process.env.PORT || 3000;
mongoose.Promise = global.Promise; //handles moongose promise deprecation
mongoose.connect('mongodb://localhost:27017/grocerybot');

//parsing
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(passport.initialize());

//routing
var router=express.Router();

router.route('/items')
.post(basicAuthCtrl.isAuthenticated ,itemCtrl.postItem)
.get(basicAuthCtrl.isAuthenticated ,itemCtrl.getItems);


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
app.use('/api', router);


//launcher
app.listen(port);
console.log('wanna buy some paprika at port '+port+'?');










