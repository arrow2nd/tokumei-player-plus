type NumData = {
  start: number
  padNum: number
}

type ReplaceData = {
  before: number
  after: string
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
  replace: ReplaceData[]
  isContinuation: boolean
}
