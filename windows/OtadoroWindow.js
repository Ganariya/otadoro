const {BrowserWindow, ipcMain: ipc} = require('electron')
const Store = require('electron-store')
const store = new Store()

ipc.on('hello', (event, moji) => {
    console.log(moji)
})

module.exports = class OtadoroWindow {
    constructor() {
        const {screen} = require('electron')
        const {width, height} = screen.getPrimaryDisplay().workAreaSize;
        this.window = new BrowserWindow({
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
        this.window.setIgnoreMouseEvents(true)
        this.window.loadFile('client/index.html')
    }

    wakeUpWindow() {
        console.log(10)
    }

}

