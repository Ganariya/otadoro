const {ipcRenderer: ipc} = require('electron')

ipc.send('hello', 'world')