import React, { useState, useRef, useCallback, useMemo } from 'react'
import Control from './Control'
import SeekBar from './SeekBar'
import { useAudio } from './useAudio'
import { useRadioEpisodes } from './useRadioEpisodes'
import radioData from '../data/radio-data.json'

function createRadioOptions(isNowOnAir: boolean): JSX.Element[] {
  return radioData
    .filter((e) => (isNowOnAir ? e.latest === 0 : e.latest !== 0))
    .map((e) => {
      return (
        <option key={e.id} value={e.id}>
          {e.name}
        </option>
      )
    })
}

const UI = (): JSX.Element => {
  const [nowOnAirRadioOptions] = useState(createRadioOptions(true))
  const [noLongerOnAirRadioOptions] = useState(createRadioOptions(false))
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentNumber, setCurrentNumber] = useState(0)

  const nameRef = useRef<HTMLSelectElement>(null)

  const [currentTime, play, pause, resume, setCurrentTime] = useAudio()
  const [episodes, oldest, latest] = useRadioEpisodes(radioData[currentIndex])

  // 音源URL
  const url = useMemo(() => {
    const num = String(currentNumber)
    const currentRadio = radioData[currentIndex]
    const path = currentRadio.url
      .replace(/\[num_1\]/g, num.padStart(currentRadio.digits_1, '0'))
      .replace(/\[num_2\]/g, num.padStart(currentRadio.digits_2, '0'))
    console.log(`[url] ${path}`)
    return 'https://omocoro.heteml.net/radio/' + path
  }, [currentIndex, currentNumber])

  // 放送回一覧
  const episodeOptions = useMemo(() => {
    return episodes.map((e) => {
      return (
        <option key={e} value={e}>
          {'# ' + String(e).padStart(3, '0')}
        </option>
      )
    })
  }, [episodes])

  // ラジオ名が変更された
  const handlChangeName = useCallback(() => {
    if (nameRef.current?.value) {
      const idx = nameRef.current.selectedIndex
      setCurrentIndex(idx)
      console.log('change')
      setCurrentNumber(radioData[idx].oldest) // MEMO: URLに反映されない
    }
  }, [])

  // 話数が変更された
  const handleChangeNumber = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setCurrentNumber(Number(e.currentTarget.value))
    },
    []
  )

  // 新規再生
  const handlePlay = useCallback(() => play(url), [play, url])

  // 再生ステータス変更
  const handleChangeStatus = useCallback((f: boolean) => setIsPlaying(f), [])

  // 次の回へ
  const handleAddNumber = useCallback(() => {
    const num = currentNumber + 1
    setCurrentNumber(num > latest ? oldest : num)
  }, [currentNumber, oldest, latest])

  // 前の回へ
  const handleDecNumber = useCallback(() => {
    const num = currentNumber - 1
    setCurrentNumber(num < oldest ? latest : num)
  }, [currentNumber, oldest, latest])

  return (
    <>
      <div className="select drag-area">
        <select disabled={isPlaying} ref={nameRef} onChange={handlChangeName}>
          <optgroup label="放送中">{nowOnAirRadioOptions}</optgroup>
          <optgroup label="放送終了">{noLongerOnAirRadioOptions}</optgroup>
        </select>
        <select
          disabled={isPlaying}
          value={currentNumber}
          onChange={handleChangeNumber}
        >
          {episodeOptions}
        </select>
      </div>
      <SeekBar />
      <Control
        isPlaying={isPlaying}
        url={url}
        onNewPlay={handlePlay}
        onResume={resume}
        onPause={pause}
        onAddNumber={handleAddNumber}
        onDecNumber={handleDecNumber}
        onChangeStatus={handleChangeStatus}
      />
    </>
  )
}

export default UI
