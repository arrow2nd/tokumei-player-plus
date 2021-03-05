import React, { useState, useRef } from 'react'
import { useRadioEpisodes } from './useRadioEpisodes'
import radioData from '../data/radio-data.json'
import { RadioData } from './RadioData'

type SelectProps = {
  isPlaying: boolean
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
  const numRef = useRef<HTMLSelectElement>(null)

  const [current, setCurrent] = useState(radioData[0])

  const episodeOptions = useRadioEpisodes(
    current.firstEpisode,
    current.lastEpisode,
    current.tag,
    current.regex
  )

  // URLを作成
  const createUrl = (data: RadioData, numStr: string) => {
    const url = data.url
      .replace(/\[num_1\]/g, numStr.padStart(data.digits_1, '0'))
      .replace(/\[num_2\]/g, numStr.padStart(data.digits_2, '0'))
    props.setUrl(url)
    console.log(url)
  }

  // ラジオ名が変更された
  const handleNameChange = () => {
    if (!nameRef.current?.value) return
    const idx = nameRef.current.selectedIndex
    const current = radioData[idx]
    const firstEp = String(current.firstEpisode)
    setCurrent(current)
    createUrl(current, firstEp)
    if (numRef.current) {
      numRef.current.value = firstEp
    }
  }

  // 話数が変更された
  const handleNumberChange = () => {
    if (numRef.current) {
      createUrl(current, numRef.current.value)
    }
  }

  return (
    <div className="select drag-area">
      <select
        name="ラジオ名"
        disabled={props.isPlaying}
        ref={nameRef}
        onChange={handleNameChange}
      >
        <optgroup label="放送中">{nowOnAirRadioOptions}</optgroup>
        <optgroup label="放送終了">{noLongerOnAirRadioOptions}</optgroup>
      </select>
      <select
        disabled={props.isPlaying}
        ref={numRef}
        onChange={handleNumberChange}
      >
        {episodeOptions}
      </select>
    </div>
  )
}

export default Select
