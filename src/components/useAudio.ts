/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react'
import { useForceUpdate } from './useForceUpdate'

type AudioType = [
  isPlaying: boolean,
  currentTime: number,
  currentSrc: string,
  play: (src: string) => Promise<number>,
  pause: () => void,
  resume: () => void,
  setCurrentTime: (time: number) => void,
  setEndedFunc: (callBack: () => void) => void
]

export const useAudio = (): AudioType => {
  const [audioElm] = useState(new Audio())
  const forceUpdate = useForceUpdate()

  useEffect(() => {
    audioElm.addEventListener('play', forceUpdate)
    audioElm.addEventListener('pause', forceUpdate)
    audioElm.addEventListener('timeupdate', forceUpdate)
    audioElm.onerror = () => {
      audioElm.pause()
      window.api.ErrorDialog(
        '再生に失敗しました',
        '存在しない、または非公開になった可能性があります。'
      )
    }

    return () => {
      audioElm.removeEventListener('play', forceUpdate)
      audioElm.removeEventListener('pause', forceUpdate)
      audioElm.removeEventListener('timeupdate', forceUpdate)
    }
  }, [])

  const play = useCallback(async (src: string): Promise<number> => {
    audioElm.src = src
    await audioElm.play()
    return Math.floor(audioElm.duration)
  }, [])

  const pause = useCallback(() => audioElm.pause(), [])

  const resume = useCallback(() => audioElm.play(), [])

  const setCurrentTime = useCallback((time: number) => {
    audioElm.currentTime = time
  }, [])

  const setEndedFunc = useCallback((callBack: () => void) => {
    audioElm.onended = callBack
  }, [])

  return [
    !audioElm.paused,
    Math.floor(audioElm.currentTime),
    audioElm.src,
    play,
    pause,
    resume,
    setCurrentTime,
    setEndedFunc
  ]
}
