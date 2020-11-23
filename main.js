const path = require('path')
require('electron-reload')(__dirname, {electron: path.join(__dirname, 'node_modules', '.bin', 'electron')})
const log = require('electron-log')
const {app, BrowserWindow, Notification} = require('electron')
process.on('uncaughtException', (err) => {
    log.error('electron:event:uncaughtException');
    log.error(err);
    log.error(err.stack);
    app.quit();
})

require('dotenv').config()
const twitterAPI = require('node-twitter-api')
const twitter = new twitterAPI({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callback: 'https://www.google.co.jp/'
})

const {openTwitterAPIWindow} = require('./windows/TwitterAPIWindow')
const OtadoroWindow = require('./windows/OtadoroWindow')
const PomodoroTimer = require('./components/PomodoroTimer')
const OtadoroTray = require('./components/OtadoroTray')

const Store = require('electron-store')
const store = new Store()

let pomodoroTimer = null
let otadoroTray = null
let main = null

class Main {
    constructor() {
        app.on('window-all-closed', this.allClosedEvent)
        this.initWindowEvent()
    }

    initWindowEvent() {
        openTwitterAPIWindow()
        let w = new BrowserWindow({width: 10, height:30})
        w.loadURL('https://github.com')
    }

    allClosedEvent() {
        if (process.platform !== 'darwin') app.quit()
    }

    wakeUpOtadoroWindow() {
        otadoroWindow.wakeUpWindow()
    }

    wakeDownOtadoroWindow() {
        otadoroWindow.wakeDownWindow()
    }
}


app.whenReady().then(() => {
    main = new Main()
    // pomodoroTimer = new PomodoroTimer(main)
    // otadoroTray = new OtadoroTray(pomodoroTimer)
    let window = new BrowserWindow(({width: 300, height: 300}))
    window.loadURL('https://github.com')
})




















