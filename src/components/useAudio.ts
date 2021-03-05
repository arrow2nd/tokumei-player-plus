import { useState } from 'react'

type AudioType = [
  currentTime: number,
  play: (src: string) => void,
  pause: () => void,
  resume: () => void,
  setCurrentTime: (time: number) => void
]

export const useAudio = (): AudioType => {
  const [audioElm] = useState(new Audio())

  const play = (src: string) => {
    console.log(`play: ${src}`)
    audioElm.src = src
    audioElm.play()
  }

  const pause = () => {
    console.log(`pause: ${audioElm.src}`)
    audioElm.pause()
  }

  const resume = () => {
    console.log(`resume: ${audioElm.src}`)
    audioElm.play()
  }

  const setCurrentTime = (time: number) => {
    console.log(`time: ${time}`)
    audioElm.currentTime = time
  }

  return [audioElm.currentTime, play, pause, resume, setCurrentTime]
}
