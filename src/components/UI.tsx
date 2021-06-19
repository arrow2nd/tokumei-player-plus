import React, { useState, useCallback, useEffect } from 'react'
import Select from './Select'
import SeekBar from './SeekBar'
import Control from './Control'
import { useAudio } from './useAudio'
import { useRadioEpisodes } from './useRadioEpisodes'
import radioData from '../data/radio-data'

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

  // Webサイトを開く
  const handleClickOpenWebSite = useCallback(async () => {
    const tag = radioData[currentRadioId].tag
    const isOpenWebSite = await window.api.InfoDialog(
      'ブラウザを開きますか？',
      `オモコロの「${tag}」のページを開きます。`
    )
    if (isOpenWebSite) {
      window.api.OpenWebSite(tag)
    }
  }, [currentRadioId])

  // シャッフル再生 ON/OFF
  const handleClickShuffle = useCallback(() => {
    setIsShuffle((prev) => !prev)
  }, [])

  // 再生する
  const handlePlay = useCallback(
    async (url: string) => {
      const duration = await play(url)
      setDurationTime(duration)
    },
    [play]
  )

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
        onClickOpenWebSite={handleClickOpenWebSite}
      />
    </>
  )
}

/**
 * URLを作成
 *
 * @param radioId ラジオID
 * @param episodeNum 話数
 * @returns URL文字列
 */
function createURL(radioId: number, episodeNum: number) {
  const currentRadio = radioData[radioId]
  let path = currentRadio.url

  // URLにファイル名を追加
  currentRadio.numData.forEach((numData, idx) => {
    // 続きの話数ならそのまま使用、それ以外ならファイル番号を計算する。
    const num = currentRadio.isContinuation
      ? episodeNum
      : numData.start + episodeNum - currentRadio.oldest
    const paddedNumStr = String(num).padStart(numData.padNum, '0')

    path = path.replace(new RegExp(`\\[num_${idx}\\]`, 'g'), paddedNumStr)
  })

  return `https://omocoro.heteml.net/radio/${path}`
}

export default UI
