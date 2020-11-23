const path = require('path')
require('electron-reload')(__dirname, {electron: path.join(__dirname, 'node_modules', '.bin', 'electron')})
const {app} = require('electron')

const TwitterAPIWindow = require('./windows/TwitterAPIWindow')

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
        let twitterAPIWindow, otadoroWindow;
        if (!store.has('TWITTER_ACCESS_TOKEN')) twitterAPIWindow = new TwitterAPIWindow()
        else otadoroWindow = new OtadoroWindow()
    }

    allClosedEvent() {
        if (process.platform !== 'darwin') app.quit()
    }
}


app.whenReady().then(() => {
    main = new Main()
    pomodoroTimer = new PomodoroTimer()
    otadoroTray = new OtadoroTray(pomodoroTimer)
})





















