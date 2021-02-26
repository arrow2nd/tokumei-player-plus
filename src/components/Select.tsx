import React, { useRef, useEffect, useCallback, useState } from 'react'

import radioData from '../data/radio-data.json'

type SelectProps = {
  setSrc: (url: string) => void
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
  const radioNameRef = useRef<HTMLSelectElement>(null)
  const radioNumRef = useRef<HTMLSelectElement>(null)

  const setSrc = useCallback(() => {
    if (!radioNameRef.current?.value || !radioNumRef.current?.value) return
    const idx: number = radioNameRef.current.selectedIndex
    const url = radioData[idx].url
      .replace(
        /\[num_1\]/g,
        radioNumRef.current.value.padStart(radioData[idx].digits_1, '0')
      )
      .replace(
        /\[num_2\]/g,
        radioNumRef.current.value.padStart(radioData[idx].digits_2, '0')
      )
    props.setSrc(url)
  }, [props])

  useEffect(() => {
    setSrc()
  }, [setSrc])

  const radioNumOptions = []
  for (let i = 1; i < 100; i++) {
    radioNumOptions.push(
      <option key={i} value={i}>
        {String(i).padStart(3, '0')}
      </option>
    )
  }

  return (
    <div className="select drag-area">
      <select
        name="ラジオ名"
        defaultValue="0"
        ref={radioNameRef}
        onChange={setSrc}
      >
        <optgroup label="放送中">{nowOnAirRadioOptions}</optgroup>
        <optgroup label="放送終了">{noLongerOnAirRadioOptions}</optgroup>
      </select>
      #
      <select name="話数" defaultValue="0" ref={radioNumRef} onChange={setSrc}>
        {radioNumOptions}
      </select>
    </div>
  )
}

export default Select
