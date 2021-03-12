import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  AppExit: () => {
    ipcRenderer.send('ipc-app-exit')
  },
  WindowMinimize: () => {
    ipcRenderer.send('ipc-win-minimize')
  },
  OpenWebSite: (tag: string) => {
    ipcRenderer.send('ipc-open-website', tag)
  },
  InfoDialog: async (title: string, content: string): Promise<boolean> => {
    const selected = await ipcRenderer.invoke('ipc-info-dialog', title, content)
    return selected.response === 0
  },
  ErrorDialog: (title: string, content: string) => {
    ipcRenderer.send('ipc-error-dialog', title, content)
  }
})
