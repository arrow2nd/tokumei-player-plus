import React, { useState, useCallback, useEffect } from 'react'
import Select from './Select'
import SeekBar from './SeekBar'
import Control from './Control'
import { useAudio } from './useAudio'
import { useRadioEpisodes } from './useRadioEpisodes'
import radioData from '../data/radio-data'

/**
 * URLを作成
 *
 * @param radioId ラジオID
 * @param episodeNo 話数
 * @returns URL文字列
 */
function createURL(radioId: number, episodeNo: number) {
  const num = String(episodeNo)
  const currentRadio = radioData[radioId]
  const path = currentRadio.url
    .replace(/\[num_1\]/g, num.padStart(currentRadio.digits_1, '0'))
    .replace(/\[num_2\]/g, num.padStart(currentRadio.digits_2, '0'))
  return 'https://omocoro.heteml.net/radio/' + path
}

const UI = (): JSX.Element => {
  const [currentRadioId, setCurrentRadioId] = useState(0)
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

  const [episodeOptions, oldest, latest] = useRadioEpisodes(
    radioData[currentRadioId]
  )

  // ラジオIDが変更された
  const handlChangeRadioId = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const id = e.currentTarget.selectedIndex
      setCurrentRadioId(id)
      setCurrentEpisode(radioData[id].oldest)
    },
    []
  )

  // 話数が変更された
  const handleChangeEpisode = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setCurrentEpisode(Number(e.currentTarget.value))
    },
    []
  )

  // 再生する
  const handlePlay = useCallback(
    async (url: string) => {
      const duration = await play(url)
      setDurationTime(duration)
    },
    [play]
  )

  // シャッフル再生 ON/OFF
  const handleClickShuffle = useCallback(() => {
    setIsShuffle((prev) => !prev)
  }, [])

  // 話数を変更する
  const changeEpisode = useCallback(
    (step: number, isShuffle: boolean): string => {
      let episode = isShuffle
        ? Math.floor(Math.random() * (latest - oldest + 1)) + oldest
        : currentEpisode + step

      // 制限
      if (episode > latest) {
        episode = oldest
      } else if (episode < oldest) {
        episode = latest
      }

      // 除外リストにあればスキップ
      if (radioData[currentRadioId].ignore.includes(episode)) {
        episode += step
      }

      // 異なっていたら変更する
      if (episode !== currentEpisode) {
        setCurrentEpisode(episode)
      }
      return createURL(currentRadioId, episode)
    },
    [currentEpisode, currentRadioId, latest, oldest]
  )

  // 再生終了後のコールバック関数
  useEffect(() => {
    setEndedFunc(() => {
      const next = changeEpisode(1, isShuffle)
      handlePlay(next)
    })
  }, [changeEpisode, handlePlay, isShuffle, setEndedFunc])

  return (
    <>
      <Select
        isPlaying={isPlaying}
        currentNumber={currentEpisode}
        radioData={radioData}
        episodes={episodeOptions}
        onChangeRadioId={handlChangeRadioId}
        onChangeEpisode={handleChangeEpisode}
      />
      <SeekBar
        currentTime={currentTime}
        durationTime={durationTime}
        onSeek={handleSeek}
      />
      <Control
        isPlaying={isPlaying}
        isShuffle={isShuffle}
        currentSrc={currentSrc}
        changeEpisode={changeEpisode}
        onPlay={handlePlay}
        onPause={handlePause}
        onResume={handleResume}
        onClickShuffle={handleClickShuffle}
      />
    </>
  )
}

export default UI
