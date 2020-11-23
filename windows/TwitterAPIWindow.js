require('dotenv').config()
const {BrowserWindow, Notification, app} = require('electron')
const Store = require('electron-store')
const twitterAPI = require('node-twitter-api')
const twitter = new twitterAPI({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callback: 'https://www.google.co.jp/'
})
const store = new Store();

let twitterAPIWindow = null;

function getToken() {
    twitter.getRequestToken((error, requestToken, requestTokenSecret, results) => {
        const url = twitter.getAuthUrl(requestToken);
        twitterAPIWindow.webContents.on('will-navigate', (event, url) => {
            const matched = url.match(/\?oauth_token=([^&]*)&oauth_verifier=([^&]*)/);
            twitter.getAccessToken(requestToken, requestTokenSecret, matched[2], (error, accessToken, accessTokenSecret, results) => {
                const twitterAccessToken = accessToken;
                const twitterAccessTokenSecret = accessTokenSecret;
                twitter.verifyCredentials(twitterAccessToken, twitterAccessTokenSecret, {}, (error, data, response) => {
                    twitterAPIWindow.loadURL('file://' + __dirname + '/index.html');
                });
                store.set('TWITTER_ACCESS_TOKEN', twitterAccessToken)
                store.set('TWITTER_ACCESS_TOKEN_SECRET', twitterAccessTokenSecret)
            });
            event.preventDefault()
        })
        twitterAPIWindow.loadURL(url)
    })
}

function openTwitterAPIWindow() {
    twitterAPIWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }
    })
    getToken()
}

function closeTwitterAPIWindow() {

}

module.exports = {
    openTwitterAPIWindow,
    closeTwitterAPIWindow
}
