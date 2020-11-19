require('dotenv').config()
require('electron-reload')(__dirname);
const {app, BrowserWindow, Tray, Menu} = require('electron')
const Store = require('electron-store')
// const menubar = require('menubar').menubar()
const twitterAPI = require('node-twitter-api')
const twitter = new twitterAPI({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callback: 'https://www.google.co.jp/'
})
const store = new Store();
// const pomodoroUnitMinuts = 25 * 60;
const pomodoroUnitMinuts = 4;

let twitterAccessToken;
let twitterAccessTokenSecret;
let tray;
let remainTime = 0;
let intervalTimerID;
let otadoroWin;

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

function otadoroWindow() {
    const {screen} = require('electron')
    const {width, height} = screen.getPrimaryDisplay().workAreaSize;
    otadoroWin = new BrowserWindow({
        width: width,
        height: height,
        transparent: true,
        frame: false,
        resizable: false,
        alwaysOnTop: true,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
        }
    })
    otadoroWin.setIgnoreMouseEvents(true)
    otadoroWin.loadFile('index.html')
}

function startTimer() {
    remainTime = pomodoroUnitMinuts;
    setInterval(() => {
        remainTime--;
        if (remainTime < 0) {
            clearInterval(intervalTimerID)
            if (otadoroWin) {
                // otadoroWin.setIgnoreMouseEvents(false)
                otadoroWin.maximize()
                otadoroWin.focus()

            }
        }
    }, 1000);
}

function initTray() {
    tray = new Tray('ganariya_2.png')
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Start', click: startTimer
        },
        {
            label: 'Stop', click: () => {

            }
        },
    ])
    tray.setContextMenu(contextMenu)
    tray.setTitle('25:00')
    tray.setIgnoreDoubleClickEvents(true)
    intervalTimerID = setInterval(() => {
        const minutes = Math.floor(remainTime / 60);
        const seconds = remainTime % 60;
        const newText = ("00" + minutes).slice(-2) + ":" + ("00" + seconds).slice(-2);
        tray.setTitle(newText)
    }, 1000);
}

function initApp() {
    if (!store.has('TWITTER_ACCESS_TOKEN')) {
        twitterAPIWindow()
    } else {
        otadoroWindow()
    }
    initTray()
}

app.whenReady().then(initApp)

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



