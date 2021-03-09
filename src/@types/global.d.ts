declare global {
  interface Window {
    api: API
  }
}

export type API = {
  AppExit: () => void
  WindowMinimize: () => void
}
