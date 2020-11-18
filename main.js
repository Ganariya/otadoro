const electron = require('electron')

const twitterAPI = require('node-twitter-api')
const twitter = new twitterAPI({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callback: 'https://www.google.co.jp/'
})