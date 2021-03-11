declare global {
  interface Window {
    api: API
  }
}

export type API = {
  AppExit: () => void
  WindowMinimize: () => void
  OpenWebSite: (tag: string) => void
  InfoDialog: (title: string, content: string) => Promise<boolean>
  ErrorDialog: (title: string, content: string) => void
}
