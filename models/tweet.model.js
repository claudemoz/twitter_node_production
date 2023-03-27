const mongoose = require('mongoose')

const tweetSchema = mongoose.Schema(
    {
        content:{
            type: String,
            maxLength: [140, 'Trop long'],
            minLength: [1, 'Trop court'],
            require: [true, 'Ce champ est obligatoire']
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
        }
    }
)

TweetModel = mongoose.model('tweet', tweetSchema )
module.exports = TweetModel