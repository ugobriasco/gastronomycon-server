var mongoose = require('mongoose'),
	bcrypt = require('bcrypt-nodejs');


var UserSchema = new mongoose.Schema({
	email: {type: String, unique: true},
	password: String,
  passwordResetToken: String,
  passwordResetExpires: Date,

  facebook: String,
  tokens: Array,


  profile: {
    name: String,
    avatar: String,
    cover: String,
  	},
	role: {
  	type: String,
  	enum: ['User', 'Admin'],
  	default: 'User'
	},
//	resetPasswordToken: {type: String},
//	resetPasswordExpires: {type: Date},
},{timestamps: true});


/**
 * Password hash middleware.
 */



UserSchema.pre('save', function(callback) {
  var user = this;
  if (!user.isModified('password')) return callback();
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return callback(err);
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return callback(err);
      user.password = hash;
      callback();
    });
  });
});


UserSchema.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

/**
 * Helper method for getting user's gravatar.
 */
UserSchema.methods.gravatar = function gravatar(size) {
  if (!size) {
    size = 200;
  }
  if (!this.email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);