require('dotenv').config()
require('electron-reload')(__dirname);
const {app, BrowserWindow, Tray, Menu} = require('electron')
const Store = require('electron-store')
const twitterAPI = require('node-twitter-api')
const twitter = new twitterAPI({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callback: 'https://www.google.co.jp/'
})
const TwitterAPIWindow = require('./windows/TwitterAPIWindow')
const store = new Store();
// const pomodoroUnitMinuts = 25 * 60;
const pomodoroUnitMinuts = 4;

let tray;
let remainTime = 0;
let intervalTimerID;
let otadoroWin;

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
    tray = new Tray('ganariya.png')
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
        const window = new TwitterAPIWindow()
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

// app.on('activate', () => {
//     if (BrowserWindow.getAllWindows().length === 0) {
//         createWindow()
//     }
// })







