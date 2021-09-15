import React, { useState, useCallback, useEffect } from 'react'
import { useAudio } from '../../hooks/useAudio'
import { useRadioData } from '../../hooks/useRadioData'
import Select from '../select'
import SeekBar from '../seekbar'
import Control from '../control'

const UI = (): JSX.Element => {
  const [currentRadioName, setCurrentRadioName] = useState('')
  const [currentEpisode, setCurrentEpisode] = useState(1)
  const [durationTime, setDurationTime] = useState(0)
  const [isShuffle, setIsShuffle] = useState(false)

  const [
    isPlaying,
    currentTime,
    currentSrc,
    play,
    handlePause,
    handleResume,
    handleSeek,
    setEndedFunc
  ] = useAudio()

  const [episodeOptions, oldest, latest] = useRadioData(currentRadioName)

  const handlChangeRadioName = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setCurrentRadioName(e.currentTarget.value)
    },
    []
  )

  return (
    <>
      <Select
        episodes={episodeOptions}
        onChangeRadioName={handlChangeRadioName}
      />
    </>
  )
}

export default UI
