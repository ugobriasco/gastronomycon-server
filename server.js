//vendor
const express = require('express');
const validate = require('express-validation');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');

const api = require('./server/api/api.routes');
const cfg = require('./cfg');

// Database
const db = mongoose.connection;
mongoose.Promise = global.Promise; //handles ES6 moongose promise deprecation
mongoose.connect(
  cfg.db.local,
  {
    useCreateIndex: true, //handles DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead
    useNewUrlParser: true //handles ES6 moongose promise deprecation
  }
);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log(`Connected to Mongo at: ${new Date()}`);
});

// Application backbone
const app = express();
const port = process.env.PORT || 3000;

// Enable CORS
app.all('/*', function(req, res, next) {
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
app.use('/', api);

// Error handling
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

// Launcher
app.listen(port);
console.log('wanna buy some paprika at port ' + port + '?');
