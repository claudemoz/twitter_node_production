const router = require('express').Router();
const tweetControllers = require('../controllers/tweets.controller');

router.get('/new', tweetControllers.tweetNew);
router.get('/', tweetControllers.tweetList);
router.post('/', tweetControllers.tweetCreate);
router.get('/edit/:tweetId', tweetControllers.tweetEdit);
router.post('/update/:tweetId', tweetControllers.tweetUpdate);
router.delete('/:tweetId', tweetControllers.tweetDelete);

module.exports = router;