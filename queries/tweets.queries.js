const TweetModel = require('../models/tweet.model')

exports.getTweets = ()=>{
    return TweetModel.find().exec();
}

exports.getTweet = (id)=>{
    return TweetModel.findOne({_id: id}).exec();
}

exports.createTweet  = (data)=>{
    return TweetModel.create(data);
}

exports.updateTweet  = (tweetId, tweet)=>{
    return TweetModel.findByIdAndUpdate(tweetId, {$set: tweet}, {runValidators: true});
}
exports.deleteTweet  = (id)=>{
    return TweetModel.findByIdAndDelete(id).exec();
}
exports.getCurrentUserTweetsWithFollowing = (user)=>{
    return TweetModel.find({ author: { $in: [...user.following, user._id]} }).populate('author').exec();
}

exports.getUserTweetsFromAuthorid = (authorId)=>{
    return TweetModel.find({ author:authorId }).populate('author').exec();
}