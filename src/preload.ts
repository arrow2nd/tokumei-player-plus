import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  AppExit: () => ipcRenderer.send('ipc-app-exit'),
  WindowMinimize: () => ipcRenderer.send('ipc-win-minimize'),
  Play: (radioID: string, radioNo: number) => {
    // console.log(args)
    ipcRenderer.invoke('ipc-audio-play', radioID, radioNo)
  },
  Pause: () => ipcRenderer.send('ipc-audio-pause')
})
