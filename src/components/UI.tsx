import React, { useState, useCallback, useMemo } from 'react'
import Select from './Select'
import SeekBar from './SeekBar'
import Control from './Control'
import { useAudio } from './useAudio'
import { useRadioEpisodes } from './useRadioEpisodes'
import radioData from '../data/radio-data.json'

const UI = (): JSX.Element => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentNumber, setCurrentNumber] = useState(1)
  const [durationTime, setDurationTime] = useState(0)
  const [isShuffle, setIsShuffle] = useState(false)

  const [
    isPlaying,
    currentTime,
    play,
    handlePause,
    handleResume,
    handleSeek
  ] = useAudio()

  const [episodeOptions, oldest, latest] = useRadioEpisodes(
    radioData[currentIndex]
  )

  // 音源URL
  const url = useMemo(() => {
    const num = String(currentNumber)
    const currentRadio = radioData[currentIndex]
    const path = currentRadio.url
      .replace(/\[num_1\]/g, num.padStart(currentRadio.digits_1, '0'))
      .replace(/\[num_2\]/g, num.padStart(currentRadio.digits_2, '0'))
    return 'https://omocoro.heteml.net/radio/' + path
  }, [currentIndex, currentNumber])

  // ラジオ名が変更された
  const handlChangeRadio = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const idx = e.currentTarget.selectedIndex
      setCurrentIndex(idx)
      setCurrentNumber(radioData[idx].oldest)
    },
    []
  )

  // 話数が変更された
  const handleChangeNumber = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setCurrentNumber(Number(e.currentTarget.value))
    },
    []
  )

  // 次の回へ
  const handleIncNumber = useCallback(() => {
    const num = currentNumber + 1
    setCurrentNumber(num > latest ? oldest : num)
  }, [currentNumber, latest, oldest])

  // 前の回へ
  const handleDecNumber = useCallback(() => {
    const num = currentNumber - 1
    setCurrentNumber(num < oldest ? latest : num)
  }, [currentNumber, latest, oldest])

  // 新規再生
  const handlePlay = useCallback(async () => {
    const dTime = await play(url)
    setDurationTime(dTime)
  }, [play, url])

  // シャッフル切替
  const handleClickShuffle = useCallback(() => {
    setIsShuffle((prev) => !prev)
  }, [])

  return (
    <>
      <Select
        isPlaying={isPlaying}
        currentNumber={currentNumber}
        radioData={radioData}
        episodeOptions={episodeOptions}
        onChangeRadio={handlChangeRadio}
        onChangeNumber={handleChangeNumber}
      />
      <SeekBar
        currentTime={currentTime}
        durationTime={durationTime}
        onSeek={handleSeek}
      />
      <Control
        isPlaying={isPlaying}
        isShuffle={isShuffle}
        url={url}
        onNewPlay={handlePlay}
        onResume={handleResume}
        onPause={handlePause}
        onIncNumber={handleIncNumber}
        onDecNumber={handleDecNumber}
        onClickShuffle={handleClickShuffle}
      />
    </>
  )
}

export default UI
