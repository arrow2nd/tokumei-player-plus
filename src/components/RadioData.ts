type NumData = {
  start: number
  padNum: number
}

export type RadioData = {
  id: string
  name: string
  tag: string
  regex: string
  url: string
  numData: NumData[]
  oldest: number
  latest: number
  ignore: number[]
  isContinuation: boolean
}
