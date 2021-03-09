/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useForceUpdate } from './useForceUpdate'

type AudioType = [
  isPlaying: boolean,
  currentTime: number,
  play: (src: string) => Promise<number>,
  pause: () => void,
  resume: () => void,
  setCurrentTime: (time: number) => void
]

export const useAudio = (): AudioType => {
  const [audioElm] = useState(new Audio())
  const forceUpdate = useForceUpdate()

  useEffect(() => {
    audioElm.addEventListener('play', forceUpdate)
    audioElm.addEventListener('pause', forceUpdate)
    audioElm.addEventListener('ended', forceUpdate)
    audioElm.addEventListener('timeupdate', forceUpdate)

    return () => {
      audioElm.removeEventListener('play', forceUpdate)
      audioElm.removeEventListener('pause', forceUpdate)
      audioElm.removeEventListener('ended', forceUpdate)
      audioElm.removeEventListener('timeupdate', forceUpdate)
    }
  }, [])

  const play = async (src: string): Promise<number> => {
    audioElm.src = src
    await audioElm.play()
    return audioElm.duration
  }

  const pause = () => audioElm.pause()

  const resume = () => audioElm.play()

  const setCurrentTime = (time: number) => (audioElm.currentTime = time)

  return [
    !audioElm.paused,
    audioElm.currentTime,
    play,
    pause,
    resume,
    setCurrentTime
  ]
}
