"use strict";
var User = (function () {
    function User() {
    }
    return User;
}());
exports.User = User;
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
//# sourceMappingURL=user.model.js.map