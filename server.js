//vendor
var express 	= require('express'),
	mongoose 	= require('mongoose'),
	path			= require('path'),
	bodyParser 	= require('body-parser'),
	passport 	= require('passport');

//config
var app			= express(),
	port 		= process.env.PORT || 3000;
mongoose.Promise = global.Promise; //handles moongose promise deprecation
mongoose.connect('mongodb://localhost:27017/grocerybot');

app.use(passport.initialize());

//parsing
app.use(bodyParser.urlencoded({
  extended: true
}));

//routing
var router 		= require('./server/api/api.routes');
app.use(express.static(path.join(__dirname, '/client'))); //Expose /client
app.use('/api', router);


//launcher
app.listen(port);
console.log('wanna buy some paprika at port '+port+'?');










