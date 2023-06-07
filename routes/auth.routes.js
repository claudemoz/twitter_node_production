const router = require('express').Router();
const {signinForm, signin, signout, signupForm,signup} = require('../controllers/auth.controller');

router.get('/signup/form',  signupForm);
router.post('/signup',      signup);
router.get('/signin/form',  signinForm);
router.post('/signin',      signin);
router.get('/signout',    signout);

module.exports = router;