//vendor
const express 			   = require('express'),
	expressValidator 	 = require('express-validator'),
	mongoose 			     = require('mongoose'),
	path				       = require('path'),
	bodyParser 			   = require('body-parser'),
	passport 			     = require('passport');

//config
var app			= express(),
    port 		= process.env.PORT || 3000;

const cfg = require('./server/cfg');

mongoose.Promise = global.Promise; //handles moongose promise deprecation
mongoose.connect(cfg.db.local);


//Enable CORS
app.all("/api/*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With, Access-Control-Allow-Headers");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  if (req.method.toLowerCase() !== "options") {
    return next();
  }
  return res.send(204);
});

app.use(passport.initialize());

//parsing
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//routing
var api 		= require('./server/api/api.routes');
app.use(express.static(path.join(__dirname, 'dist'))); //Expose /client
app.use('/api', api);


app.get('*', function(req, res){
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});


// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist/index.html'));
// });

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
// var err = new Error('Not Found');
// err.status = 404;
// next(err);
// });

//app.use('/lib', express.static(__dirname + '/node_modules'));
//app.use('/env', express.static(__dirname + '/environments'));





//launcher
app.listen(port);
console.log('wanna buy some paprika at port '+port+'?');










