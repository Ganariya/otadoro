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

const {openTwitterAPIWindow} = require('./windows/TwitterAPIWindow')
const {openOtadoroWindow, wakeDownOtadoroWindow, wakeUpOtadoroWindow} = require('./windows/OtadoroWindow')
const PomodoroTimer = require('./components/PomodoroTimer')
const {createTray} = require('./components/OtadoroTray')

const Store = require('electron-store')
const store = new Store()

let pomodoroTimer = null
let main = null

class Main {
    constructor() {
        app.on('window-all-closed', this.allClosedEvent)
        this.initWindowEvent()
        createTray()
    }

    initWindowEvent() {
        openTwitterAPIWindow()
        openOtadoroWindow()
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
    let window = new BrowserWindow(({width: 300, height: 300}))
    window.loadURL('https://github.com')
})




















