const router = require('express').Router();
const usersController = require('../controllers/users.controller');
const { autoriaze } = require('../config/guards.config')

router.get('/',                         usersController.userList);
router.get('/follow/:userId',           usersController.followUser);
router.get('/:unfollow/:userId',        usersController.unFollowUser);
router.get('/:username',                usersController.userProfile);
// router.get('/signup/form',              usersController.signupForm);
// router.post('/signup',                  usersController.signup);
router.post('/update/image', autoriaze, usersController.uploadeImage);

module.exports = router;