const passport = require('passport');
const {getTweets,getTweet, createTweet, deleteTweet, updateTweet, getCurrentUserTweetsWithFollowing} = require('../queries/tweets.queries')

exports.tweetList = async (req, res, next)=>{
    try {
        const tweets = await getCurrentUserTweetsWithFollowing(req.user);
        res.render('tweets/tweet', {tweets, isAuthenticated: req.isAuthenticated(), currentUser: req.user, user: req.user, editable: true});
     } catch (e) {
        next(e)
     }
}

exports.tweetNew = (req, res)=>{
    res.render('tweets/tweet-form.pug', {tweet: {}, isAuthenticated: req.isAuthenticated(), currentUser: req.user, user: req.user });
}

exports.tweetEdit = async(req, res, next)=>{
    try {
        const tweetId = req.params.tweetId
        const tweet = await getTweet(tweetId)
        res.render('tweets/tweet-form.pug', {tweet, isAuthenticated: req.isAuthenticated(), currentUser: req.user, user: req.user});
    } catch (e) {
        next(e)
    }
    
}

exports.tweetUpdate = async (req, res, next)=>{
    const tweetId = req.params.tweetId
    const body = req.body;
    try {
        await updateTweet(tweetId, body);
        res.redirect('/');
    } catch (err) {
        const errors = Object.keys(err.errors).map(key => err.errors[key].message);
        const tweet = await getTweet(tweetId)
        res.status(400).render('tweets/tweet-form', { errors, tweet,  isAuthenticated: req.isAuthenticated(), currentUser: req.user });
    } 
}

exports.tweetCreate = async (req, res)=>{
    const body = req.body;
    try {
        await createTweet({...body, author: req.user._id});
        res.redirect('/');
    } catch (err) {
        const errors = Object.keys(err.errors).map(key => err.errors[key].message);
        res.status(400).render('tweets/tweet-form', { errors, isAuthenticated: req.isAuthenticated(), currentUser: req.user  });
    }
   
}

exports.tweetDelete = async (req, res, next)=>{
    try {
        const id = req.params.tweetId
        await deleteTweet(id)
        const tweets = await getCurrentUserTweetsWithFollowing(req.user);
        res.render('tweets/tweet-list', {tweets, currentUser: req.user, editable: true});
    } catch (e) {
        next(e)
    }
}