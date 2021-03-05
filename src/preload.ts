import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  AppExit: () => ipcRenderer.send('ipc-app-exit'),
  WindowMinimize: () => ipcRenderer.send('ipc-win-minimize')
})
