let Tweet = require('../models/tweet');
const Joi = require('joi');

class TweetControl {
    constructor() {
        this.tweet = new Tweet;
    }

    createTweet(tweet){
        const postSchema = Joi.object().keys({
            content: Joi.string().required().min(3),
            uid: Joi.required()
        });

        Joi.validate({
            content : tweet.content,
            uid : tweet.uid,
        },postSchema,(error,tweet)=>{
            this.tweet.store(tweet)
        })
    }

    showTweets(calback){
        this.tweet.get((error,data)=>{
          if(!error){
            calback(data)
          }
        })
    }
}

module.exports = TweetControl

