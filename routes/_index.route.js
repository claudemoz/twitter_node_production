const router = require('express').Router();
const tweetsRoute = require('./tweets.routes');
const usersRoute = require('./users.routes');
const authRoute = require('./auth.routes');
const {autoriaze} = require('../config/guards.config')

router.use('/tweets',autoriaze, tweetsRoute);
router.use('/users', usersRoute);
router.use('/auth', authRoute);

router.get('/', (req, res) => {
    res.redirect('/tweets');
})

module.exports = router