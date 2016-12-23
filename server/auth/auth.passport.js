const 	passport = require('passport'),
		LocalStrategy = require('passport-local');

const	User = require('../user/user.model');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

/**
 * Sign up using Email and Password.
 */
passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, done) {
        if (email)
            email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

        // asynchronous
        process.nextTick(function() {
            if (!req.user) {
                User.findOne({ 'email' :  email }, function(err, user) {
                    if (err) {
                    	return done(err);
                    	console.log(user);
                    } if (user) {
                    	return done(null, { error: 'That email is already taken.' });
                    } else {
                        var newUser            = new User();
                        newUser.email    = email;
                        newUser.password = password;
                        newUser.save(function(err) {
                            if (err) throw err;
                            return done(null, newUser);
                        });
                    }
                });
            } else if ( !req.user.email ) {
                var user          = req.user;
            	user.email    = email;
                user.password = password;
                user.save(function(err) {
                    if (err) throw err;
                    return done(null, user);
                });
            } else {
                return done(null, req.user);
            }
        });

    }));   

