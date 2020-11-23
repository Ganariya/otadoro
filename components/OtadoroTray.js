const path = require('path')
const {Menu, Tray} = require('electron')
const {app, BrowserWindow, Notification} = require('electron')
const assetsPath = app.isPackaged ? path.join(process.resourcesPath, "assets") : "assets";

let otadoroTray = null
let contextMenu = null

function showNotification (body) {
    const notification = {
        title: 'OtadoroTray',
        body: body
    }
    new Notification(notification).show()
}

function createTray() {
    otadoroTray = new Tray( path.join(assetsPath, 'risu.png'))
    contextMenu = Menu.buildFromTemplate([
        {
            label: 'Start',
            click: callWorkStart
        },
        {
            label: 'Stop',
            click: callWorkStop
        }
    ])
    otadoroTray.setContextMenu(contextMenu)
    otadoroTray.setTitle('25:00')
}

function callWorkStart() {

}

function callWorkStop() {

}

module.exports = {
    createTray
}

// module.exports = class OtadoroTray {
//     constructor(timer) {
//         pomodoroTimer = timer
//         tray = new Tray('ganariya.png')
//         contextMenu = Menu.buildFromTemplate([
//             {
//                 label: 'Start',
//                 click: this.callWorkStart
//             },
//             {
//                 label: 'Stop',
//                 click: this.callWorkStop
//             }
//         ])
//         tray.setContextMenu(contextMenu)
//         tray.setTitle('25:00')
//     }
//
//     callWorkStart() {
//         pomodoroTimer.workStart()
//     }
//
//     callWorkStop() {
//         pomodoroTimer.workStop()
//     }
//
// }
