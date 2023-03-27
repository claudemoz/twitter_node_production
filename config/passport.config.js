const app = require('../app')
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/User.model');
// const util = require('util');


app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id).exec();
        if (user) {
            done(null, user);
        }
    } catch (e) {
        done(e, null);
    }
});

passport.use('local', new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
        const user = await User.findOne({ 'local.email': email }).exec();
        if (user) {
            const match = await user.comparePassword(password);
            if (match) {
                done(null, user)
            } else {
                done(null, false, { message: 'Password doesn\'t match' })
            }
        } else {
            done(null, false, { message: 'user not found' })
        }
    } catch (e) {
        done(e);
    }
}))

