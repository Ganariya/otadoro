const path = require('path')
require('electron-reload')(__dirname, {electron: path.join(__dirname, 'node_modules', '.bin', 'electron')})
const {app, BrowserWindow, Tray, Menu} = require('electron')
const TwitterAPIWindow = require('./windows/TwitterAPIWindow')
const OtadoroWindow = require('./windows/OtadoroWindow')
const Store = require('electron-store')
const store = new Store()

class Main {
    constructor() {
        app.whenReady().then(this.initWindowEvent)
        app.on('window-all-closed', this.allClosedEvent)
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

const main = new Main()




















