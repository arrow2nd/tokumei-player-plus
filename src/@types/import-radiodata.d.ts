declare module '*/radio-data.json' {
  interface RadioData {
    id: string
    name: string
    tag: string
    regex: string
    digits_1: number
    digits_2: number
    url: string
    firstEpisode: number
    lastEpisode: number
  }

  const value: RadioData[]
  export = value
}
