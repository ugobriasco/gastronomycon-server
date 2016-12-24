export class User {
	id?: number; //optional
	name: String;
	email: String;
	avatar: String;
	role?: String;
}


/**
 * From user model on server side
 * var UserSchema = new mongoose.Schema({
	email: {type: String, unique: true},
	password: String,
  	passwordResetToken: String,
  	passwordResetExpires: Date,

  	facebook: String,
  	tokens: Array,

  	profile: {
    name: String,
    avatar: String
  	},
  	role: {
		type: String,
		enum: ['User', 'Admin'],
		default: 'User'
	},

	role: {
		type: String,
		enum: ['User', 'Admin'],
		default: 'User'
	},
//	resetPasswordToken: {type: String},
//	resetPasswordExpires: {type: Date},
},{timestamps: true});
 */