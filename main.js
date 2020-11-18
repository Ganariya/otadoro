require('dotenv').config()
require('electron-reload')(__dirname);
const {app, BrowserWindow} = require('electron')
const Store = require('electron-store')
const twitterAPI = require('node-twitter-api')
const twitter = new twitterAPI({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callback: 'https://www.google.co.jp/'
})
const store = new Store();

let twitterAccessToken;
let twitterAccessTokenSecret;

function twitterAPIWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }
    })
    twitter.getRequestToken((error, requestToken, requestTokenSecret, results) => {
        const url = twitter.getAuthUrl(requestToken);
        win.webContents.on('will-navigate', (event, url) => {
            let matched = url.match(/\?oauth_token=([^&]*)&oauth_verifier=([^&]*)/);
            twitter.getAccessToken(requestToken, requestTokenSecret, matched[2], function (error, accessToken, accessTokenSecret, results) {
                twitterAccessToken = accessToken;
                twitterAccessTokenSecret = accessTokenSecret;
                twitter.verifyCredentials(twitterAccessToken, twitterAccessTokenSecret, {}, function (error, data, respons) {
                    win.loadURL('file://' + __dirname + '/index.html');
                });
                store.set('TWITTER_ACCESS_TOKEN', twitterAccessToken)
                store.set('TWITTER_ACCESS_TOKEN_SECRET', twitterAccessTokenSecret)
            });
            event.preventDefault()
        })
        win.loadURL(url)
    })
}

function anidoroWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }
    })
    win.loadURL('index.html')
}

function initWindow() {
    if (!store.has('TWITTER_ACCESS_TOKEN')) {
        twitterAPIWindow()
    } else {
        anidoroWindow()
    }
}

app.whenReady().then(initWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

// electron.app.on('ready', function () {
//
//     const mainWindow = new electron.BrowserWindow({
//         width: 800, height: 600,
//         webPreferences: {webSecurity: false}
//     });
//
//     twitter.getRequestToken(function (error, requestToken, requestTokenSecret, results) {
//
//         var url = twitter.getAuthUrl(requestToken);
//         mainWindow.webContents.on('will-navigate', function (event, url) {
//
//             var matched;
//
//             if (matched = url.match(/\?oauth_token=([^&]*)&oauth_verifier=([^&]*)/)) {
//
//                 twitter.getAccessToken(requestToken, requestTokenSecret, matched[2], function (error, accessToken, accessTokenSecret, results) {
//
//                     twitter_accessToken = accessToken;
//                     twitter_accessTokenSecret = accessTokenSecret;
//
//                     twitter.verifyCredentials(twitter_accessToken, twitter_accessTokenSecret, {}, function (error, data, respons) {
//
//                         mainWindow.loadURL('file://' + __dirname + '/html/index.html');
//
//                     });
//
//                 });
//
//             }
//
//             event.preventDefault();
//
//         });
//
//         mainWindow.loadURL(url);
//
//     });
//
// });