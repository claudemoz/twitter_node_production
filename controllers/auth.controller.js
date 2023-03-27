const passport = require('passport');

exports.signinForm = (req, res, next) => {
  res.render('auth/auth-form.pug', { errors: null, isAuthenticated: req.isAuthenticated(), currentUser: req.user});
}

exports.signin = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            next(e)
        } else if (!user) {
            res.render('auth/auth-form', { errors: info.message, isAuthenticated: req.isAuthenticated(), currentUser: req.user })
        } else {
            req.login(user, (err) => {
                if (err) {
                    next(err);
                } else {
                    res.redirect('/tweets');
                }
            })
        }
    })(req, res, next)
}

exports.signout = (req, res, next) => {
  req.logout((err)=>{
    if (err) {
        next(err);
    } else {
        res.redirect('/auth/signin/form');
    }
  });
}