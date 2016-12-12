var mongoose = require('mongoose'),
	bcrypt = require('bcrypt-nodejs');


var UserSchema = new mongoose.Schema({
	username:{
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	role: {
		type: String,
		enum: ['User', 'Admin'],
		default: 'User'
	},
	resetPasswordToken: {type: String},
	resetPasswordExpires: {type: Date},
},{timestamps: true});


// Execute before each user.save() call
UserSchema.pre('save', function(callback) {
  var user = this,
  		SALT_FACTOR = 5;

  // Break out if the password hasn't changed
  if (!user.isModified('password')) return next();

  // Password changed so we need to hash it
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

//passport verify psw
UserSchema.methods.verifyPassword = function(password, cb){
	bcrypt.compare(password, this.password, function(err, isMatch){
		if(err) throw err;
		cb(null, isMatch);
	});
}


// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);