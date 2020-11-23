const {Menu, Tray} = require('electron')

let tray = null
let contextMenu = null
let pomodoroTimer = null

module.exports = class OtadoroTray {
    constructor(_pomodoroTimer) {
        pomodoroTimer = _pomodoroTimer
        tray = new Tray('ganariya.png')
        contextMenu = Menu.buildFromTemplate([
            {
                label: 'Start',
                click: this.callWorkStart
            },
            {
                label: 'Stop',
                click: this.callWorkStop
            }
        ])
        tray.setContextMenu(contextMenu)
        tray.setTitle('25:00')
    }

    callWorkStart() {
        pomodoroTimer.workStart()
    }

    callWorkStop() {
        pomodoroTimer.workStop()
    }

}
