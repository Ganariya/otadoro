const {BrowserWindow, ipcMain: ipc, Notification} = require('electron')
const Store = require('electron-store')
const store = new Store()

function showNotification(title) {
    const notification = {
        title: title,
    }
    new Notification(notification).show()
}


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
        this.window.hide()
        this.registerEvent()
    }

    registerEvent() {
        ipc.on('wakeup', (event, moji) => {
            this.window.show()
        })
        ipc.on('wakedown', (event, moji) => {
            this.window.hide()
        })
    }

    wakeUpWindow() {
        this.window.show()
    }

    wakeDownWindow(){
        this.window.hide()
    }

}

