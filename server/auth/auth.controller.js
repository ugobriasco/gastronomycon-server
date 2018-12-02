const async = require('async');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../user/user.model');
const Setting = require('../setting/setting.model');
const cfg = require('../../cfg');
const sendEmail = require('../email');

const generateToken = require('./token-generate');
const findUser = require('./user-find');
const verifyToken = require('./token-verify');
const activateAccount = require('./activate-account');

// Log in the user if exists and gives the right psw
exports.postLogin = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'Please fill out all fields' });
  }
  findUser(req.body.email)
    .then(user => {
      if (!user)
        return res.status(401).json({ message: 'authentication failed' });
      return user;
    })
    .then(user =>
      user.verifyPassword(req.body.password, function(err, isMatch) {
        if (err) throw err;
        if (!isMatch)
          return res.status(401).json({ message: 'authentication failed' });
        res.status(201).json({
          token: generateToken(user),
          user: user
        });
      })
    )
    .catch(err => res.status(500).send(err));
};

// Sign Up user via email
exports.postSignUp = (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(422).json({ message: 'Please fill out all fields' });

  findUser(req.body.email)
    .then(user => {
      if (user) return res.status(422).send({ msg: 'email already in use' });

      const name = req.body.name ? req.body.name : '';

      const newUser = new User({
        email: req.body.email,
        password: req.body.password,
        role: cfg.allow_set_role_on_signup ? req.body.role : undefined,
        profile: { name }
      });

      newUser.save(function(err) {
        if (err) throw err;
        console.log('new user');
        res.status(201).json({
          token: generateToken(newUser),
          user: newUser
        });
      });
    })
    .catch(err => res.status(500).send(err));
};

// Generate a new activation token
exports.postGenerateActivationToken = (req, res) => {
  const email = req.body.email;

  return findUser(email)
    .then(user => {
      if (!user) throw { status: 404, message: 'User not found' };

      return {
        email: user.email,
        token: generateToken(user, cfg.activation_secret)
      };
    })
    .then(_res => {
      const { email, token } = _res;
      return sendEmail({ email, token, template: 'activation' });
    })
    .then(_res => {
      console.log(_res);
      res.status(_res.status).send(_res);
    })
    .catch(err =>
      res
        .status(err.status || 500)
        .send({ message: err.message || 'An error occurred', err })
    );
};

// Activate a User account given the correct verifyToken
exports.getActivateAccount = (req, res) => {
  const token = req.params.token;
  activateAccount(token)
    .then(result => res.status(result.status).send(result))
    .catch(err => res.status(500).send({ message: 'An error occurred', err }));
};

// Check if the user has the signup code befor registering him/her
exports.validateSignupCode = (req, res, next) => {
  Setting.findOne({ name: 'signupCode' }, function(err, setting) {
    if (err) throw err;
    if (setting) {
      if (setting.enabled === false || !setting) next();
      else {
        if (!req.body.signupCode)
          return res.status(422).json({
            message:
              'In order to limit the number of users of this application a -signupCode- is required in the request. Please provide it!'
          });
        if (req.body.signupCode != setting.value)
          return res.status(401).json({ message: 'wrong signupCode' });
        else next();
      }
    } else next();
  });
};

//psw management
exports.postUpdatePassword = (req, res, next) => {
  if (!req.body)
    return res.status(400).json({ message: 'Please fill out all fields' });
  findUser(req.body.email).then(user => {
    if (err) throw err;
    if (!user)
      res.status(401).json({ message: 'no user found', email: req.body.email });
    user.password = req.body.password;
    user.save(err => {
      if (err) return next(err);
      res.status(201).json({ msg: 'password has been changed' });
    });
  });
};

exports.postForgot = (req, res, next) => {
  async.waterfall(
    [
      function createRandomToken(done) {
        crypto.randomBytes(16, (err, buf) => {
          const token = buf.toString('hex');
          done(err, token);
        });
      },
      function setRandomToken(token, done) {
        User.findOne({ email: req.body.email }, (err, user) => {
          if (err) return done(err);
          if (!user)
            return res.status(422).send({ msg: 'this email does not exit' });

          user.passwordResetToken = token;
          user.passwordResetExpires = Date.now() + 3.6e7;
          user.save(err => {
            done(err, token, user);
          });
        });
      },
      function sendForgotPasswordEmail(token, user, done) {
        const transporter = nodemailer.createTransport({
          service: 'sendGrid',
          auth: {
            user: process.env.SENDGRID_USER,
            pass: process.env.SENDGRID_PASSWORD
          }
        });
        const mailOptions = {
          to: user.email,
          from: 'noreply@matchyourtie.com',
          subject: 'Reset your password on Grocerybot',
          text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
          Please click on the following link, or paste this into your browser to complete the process:\n\n
          http://${req.headers.host}/reset/${token}\n\n
          If you did not request this, please ignore this email and your password will remain unchanged.\n`
        };
        transporter.sendMail(mailOptions, err => {
          res.json({
            message: `An e-mail has been sent to ${
              user.email
            } with further instructions.`
          });
          done(err);
        });
      }
    ],
    err => {
      if (err) return next(err);
    }
  );
};

exports.postReset = (req, res, next) => {
  async.waterfall(
    [
      function resetPassword(done) {
        User.findOne({ passwordResetToken: req.params.token })
          .where('passwordResetExpires')
          .gt(Date.now())
          .exec((err, user) => {
            if (err) return next(err);
            if (user)
              return res.status(401).json({
                msg: 'Password reset token is invalid or has expired.'
              });
            user.password = req.body.password;
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            user.save(err => {
              if (err) return next(err);
              done(err, user);
            });
          });
      },
      function sendResetPasswordEmail(user, done) {
        const transporter = nodemailer.createTransport({
          service: 'sendGrid',
          auth: {
            user: process.env.SENDGRID_USER,
            pass: process.env.SENDGRID_PASSWORD
          }
        });
        const mailOptions = {
          to: user.email,
          from: 'noreply@matchyourtie.com',
          subject: 'Your Grocerybot password has been changed',
          text: `Hello,\n\nThis is a confirmation that the password for your account ${
            user.email
          } has just been changed.\n`
        };
        transporter.sendMail(mailOptions, err => {
          res.json({ msg: 'Success! Your password has been changed.' });
          done(err);
        });
      }
    ],
    err => {
      if (err) return next(err);
    }
  );
};

// Checks if the header includes a valid auth token
exports.isAuthenticated = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    var token = req.headers.authorization.split(' ')[1];
  } else {
    var token =
      req.body.token || req.query.token || req.headers['x-access-token'];
  }

  verifyToken({ token }).then(_res => {
    if (_res.status != 200) {
      return res.status(_res.status).send({ message: _res.message });
    } else {
      req.decoded = _res.decoded;
      next();
    }
  });
};

// Checks if the user has role Admin
exports.isAdmin = (req, res, next) => {
  if (req.decoded.role === 'Admin') {
    next();
  } else {
    res.status(401).send({ message: 'the user has no admin rights' });
  }
};

// Protects the acces to the user profile from exernal CRUDS - admins are allowed
exports.isAccountOwner = (req, res, next) => {
  if (
    req.query.userID === req.decoded.userID ||
    req.params.userID === req.decoded.userID ||
    req.body.userID == req.decoded.userID ||
    req.decoded.role === 'Admin'
  )
    next();
  else {
    res.status(401).send({ message: 'the user has not the rights' });
  }
};
