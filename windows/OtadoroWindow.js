const {BrowserWindow, ipcMain: ipc, Notification} = require('electron')
const Store = require('electron-store')
const store = new Store()

let otadoroWindow = null;

function openOtadoroWindow() {
    const {screen} = require('electron')
    const {width, height} = screen.getPrimaryDisplay().workAreaSize;

    otadoroWindow = new BrowserWindow({
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

    otadoroWindow.setIgnoreMouseEvents(true)
    otadoroWindow.loadFile('client/index.html')
}


function wakeUpOtadoroWindow() {
    otadoroWindow.show()
}

function wakeDownOtadoroWindow() {
    otadoroWindow.hide()
}


module.exports = {
    openOtadoroWindow,
    wakeUpOtadoroWindow,
    wakeDownOtadoroWindow
}