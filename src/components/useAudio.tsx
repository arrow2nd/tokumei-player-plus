import { useState } from 'react'

type AudioType = [
  isPlaying: boolean,
  currentTime: number,
  play: () => void,
  pause: () => void,
  setSrc: (src: string) => void,
  setCurrentTime: (time: number) => void
]

export const useAudio = (): AudioType => {
  const [audioElm] = useState(new Audio())

  const play = () => {
    audioElm.play()
  }

  const pause = () => {
    audioElm.pause()
  }

  const setSrc = (src: string) => {
    audioElm.src = src
  }

  const setCurrentTime = (time: number) => {
    audioElm.currentTime = time
  }

  return [
    !audioElm.paused,
    audioElm.currentTime,
    play,
    pause,
    setSrc,
    setCurrentTime
  ]
}
