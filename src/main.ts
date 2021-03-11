import { app, BrowserWindow, dialog, ipcMain, shell } from 'electron'
import path from 'path'

let win: BrowserWindow

function createWindow(): void {
  win = new BrowserWindow({
    width: 475,
    height: 135,
    frame: false,
    maximizable: false,
    resizable: false,
    webPreferences: {
      // Electron12から標準でtrueに (https://www.electronjs.org/docs/api/browser-window#new-browserwindowoptions)
      worldSafeExecuteJavaScript: true,
      // nodeモジュールをレンダラープロセスで使用不可に（XSS対策）
      nodeIntegration: false,
      // 実行コンテキストを分離
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('./dist/index.html')
}

// 多重起動を禁止
const doubleboot = app.requestSingleInstanceLock()
if (!doubleboot) {
  app.quit()
}

// 初期化できたらウィンドウを作成
app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// ウィンドウを閉じる
ipcMain.on('ipc-app-exit', () => app.quit())

// ウィンドウを最小化
ipcMain.on('ipc-win-minimize', () => win.minimize())

// サイトを開く
ipcMain.on('ipc-open-website', (_event: Electron.IpcMainEvent, tag: string) => {
  shell.openExternal(`https://omocoro.jp/tag/${encodeURIComponent(tag)}`)
})

// 確認メッセージ
ipcMain.handle(
  'ipc-info-dialog',
  async (
    _event: Electron.IpcMainInvokeEvent,
    title: string,
    content: string
  ): Promise<Electron.MessageBoxReturnValue> => {
    return await dialog.showMessageBox(win, {
      type: 'info',
      buttons: ['Yes', 'No'],
      title: '確認',
      message: title,
      detail: content
    })
  }
)

// エラーメッセージ
ipcMain.on(
  'ipc-error-dialog',
  (_event: Electron.IpcMainEvent, title: string, content: string) => {
    dialog.showErrorBox(title, content)
  }
)
