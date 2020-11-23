require('dotenv').config()
const {BrowserWindow, Notification} = require('electron')
const Store = require('electron-store')
const twitterAPI = require('node-twitter-api')
const twitter = new twitterAPI({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callback: 'https://www.google.co.jp/'
})
const store = new Store();


module.exports = class TwitterAPIWindow {
    constructor() {
        this.window = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true,
                enableRemoteModule: true
            }
        })
        this.getToken()
    }

    getToken() {
        twitter.getRequestToken((error, requestToken, requestTokenSecret, results) => {
            const url = twitter.getAuthUrl(requestToken);
            this.window.webContents.on('will-navigate', (event, url) => {
                const matched = url.match(/\?oauth_token=([^&]*)&oauth_verifier=([^&]*)/);
                twitter.getAccessToken(requestToken, requestTokenSecret, matched[2], (error, accessToken, accessTokenSecret, results) => {
                    const twitterAccessToken = accessToken;
                    const twitterAccessTokenSecret = accessTokenSecret;
                    twitter.verifyCredentials(twitterAccessToken, twitterAccessTokenSecret, {}, (error, data, response) => {
                        this.window.loadURL('file://' + __dirname + '/index.html');
                    });
                    store.set('TWITTER_ACCESS_TOKEN', twitterAccessToken)
                    store.set('TWITTER_ACCESS_TOKEN_SECRET', twitterAccessTokenSecret)
                });
                event.preventDefault()
            })
            this.window.loadURL(url)
        })
    }

}
