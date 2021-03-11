declare global {
  interface Window {
    api: API
  }
}

export type API = {
  AppExit: () => void
  WindowMinimize: () => void
  ErrorDialog: (titile: string, content: string) => void
}
