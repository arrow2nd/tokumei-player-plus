export type RadioInfo = {
  name: string
  onAir: boolean
}

export type RadioData = {
  name: string
  tag: string
  items: RadioItem[]
}

export type RadioItem = {
  title: string
  num: number
  url: string
}
