//vendor
const express = require('express');
const validate = require('express-validation');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');

const getConfig = require('./util/get-config');

//config
const app = express();
const port = process.env.PORT || 3000;
const cfg = getConfig();

mongoose.Promise = global.Promise; //handles ES6 moongose promise deprecation
mongoose.connect(cfg.db.local, { useNewUrlParser: true }); //handles ES6 moongose promise deprecation

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
// mongodb connection open
db.once('open', () => {
  console.log(`Connected to Mongo at: ${new Date()}`);
});

//Enable CORS
app.all('/api/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With, Access-Control-Allow-Headers'
  );
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  if (req.method.toLowerCase() !== 'options') {
    return next();
  }
  return res.sendStatus(204);
});

// Passport for social authentication
app.use(passport.initialize());

// Parsing
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Routing
const api = require('./server/api/api.routes');

app.use('/api', api);
app.get('/api/*', function(req, res) {
  res.status(404);
});

//Error handling
app.use((err, req, res, next) => {
  if (err instanceof validate.ValidationError) {
    res.status(err.status).json({ message: err.errors });
  } else {
    res.status(500).json({
      status: err.status,
      message: err.message
    });
  }
});

// api.get('*', function(req, res){
//   res.status(404).status('route not found');
// });

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist/index.html'));
// });

// catch 404 and forward to error handler
// app.use(function(req, res, nex) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// app.use(function(err, req, res, next) {
//   if(err.status !== 404) {
//     return next();
//   }
//   res.status(404).send(err.message || '** no unicorns up here **');
// });

//app.use('/lib', express.static(__dirname + '/node_modules'));
//app.use('/env', express.static(__dirname + '/environments'));

//launcher
app.listen(port);
console.log('wanna buy some paprika at port ' + port + '?');
