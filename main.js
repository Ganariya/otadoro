const path = require('path')
require('electron-reload')(__dirname, {electron: path.join(__dirname, 'node_modules', '.bin', 'electron')})
const {app, BrowserWindow, Tray, Menu} = require('electron')
const TwitterAPIWindow = require('./windows/TwitterAPIWindow')
const OtadoroWindow = require('./windows/OtadoroWindow')
const Store = require('electron-store')
const store = new Store()

app.whenReady().then(() => {
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

    const main = new Main()
})






















