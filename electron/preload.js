const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  sendNotification: (title, body) => ipcRenderer.send('notify', title, body),
  onUpdateAvailable: (callback) => ipcRenderer.on('update-available', callback),
});
