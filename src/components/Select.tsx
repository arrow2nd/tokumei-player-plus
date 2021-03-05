/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useRadioEpisodes } from './useRadioEpisodes'
import { RadioData } from './RadioData'
import radioData from '../data/radio-data.json'

type SelectProps = {
  setUrl: (url: string) => void
}

const nowOnAirRadioOptions = radioData
  .filter((e) => e.lastEpisode === 0)
  .map((e) => {
    return (
      <option key={e.id} value={e.id}>
        {e.name}
      </option>
    )
  })

const noLongerOnAirRadioOptions = radioData
  .filter((e) => e.lastEpisode !== 0)
  .map((e) => {
    return (
      <option key={e.id} value={e.id}>
        {e.name}
      </option>
    )
  })

const Select = (props: SelectProps): JSX.Element => {
  const nameRef = useRef<HTMLSelectElement>(null)
  const numRef = useRef<HTMLInputElement>(null)

  const [index, setIndex] = useState(0)
  const [current, setCurrent] = useState<RadioData>(radioData[0])

  // 話数の最大最小を取得
  const [min, max] = useRadioEpisodes(
    current.firstEpisode,
    current.lastEpisode,
    current.tag,
    current.regex
  )

  // URLを作成
  const createRadioUrl = useCallback(
    (num: number) => {
      const numStr = String(num)
      const url = current.url
        .replace(/\[num_1\]/g, numStr.padStart(current.digits_1, '0'))
        .replace(/\[num_2\]/g, numStr.padStart(current.digits_2, '0'))
      props.setUrl(url)
    },
    [current.digits_1, current.digits_2, current.url, props]
  )

  // ラジオ名が変更された
  const handleChangeName = () => {
    if (!nameRef.current?.value) return
    const idx = nameRef.current.selectedIndex
    setIndex(idx)
    setCurrent(radioData[idx])
  }

  // 話数が変更された
  const handleChangeNumber = () => {
    if (!numRef.current) return
    // 数値が範囲内かチェック
    const currentValue = Number(numRef.current.value)
    const num = currentValue > max ? max : currentValue
    numRef.current.value = String(num).padStart(3, '0')
  }

  // 話数の変更が完了した
  const handleBlurInput = () => {
    if (!numRef.current) return
    // 数値が範囲内かチェック
    const currentValue = Number(numRef.current.value)
    const num = currentValue < min ? min : currentValue
    numRef.current.value = String(num).padStart(3, '0')
    createRadioUrl(num)
  }

  // ラジオ名が変更された
  useEffect(() => {
    if (!numRef.current || !max) return
    numRef.current.value = String(max).padStart(3, '0')
    // lastEpisodeが0の場合 最新話数をセット
    if (radioData[index].lastEpisode === 0) {
      radioData[index].lastEpisode = max
    }
    createRadioUrl(max)
  }, [index, max])

  return (
    <div className="select drag-area">
      <select
        name="ラジオ名"
        defaultValue="0"
        ref={nameRef}
        onChange={handleChangeName}
      >
        <optgroup label="放送中">{nowOnAirRadioOptions}</optgroup>
        <optgroup label="放送終了">{noLongerOnAirRadioOptions}</optgroup>
      </select>
      #
      <input
        type="number"
        ref={numRef}
        onChange={handleChangeNumber}
        onBlur={handleBlurInput}
      />
    </div>
  )
}

export default Select
