import React, { useEffect, useState } from 'react'
import { fetchRadioList } from '../../hooks/useRadioData'
import { createOptions } from './createOptions'

type SelectProps = {
  // isPlaying: boolean
  // currentNumber: number
  // radioData: RadioData[]
  episodes: JSX.Element[]
  onChangeRadioName: (e: React.ChangeEvent<HTMLSelectElement>) => void
  // onChangeEpisode: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const Select = ({ episodes, onChangeRadioName }: SelectProps): JSX.Element => {
  const [onAirOptions, setOnAirOptions] = useState([] as JSX.Element[])
  const [notOnAirOptions, setNotOnAirOptions] = useState([] as JSX.Element[])

  // ラジオの選択要素を作成
  useEffect(() => {
    fetchRadioList().then((list) => {
      const [onAirOpts, notOnAirOpts] = createOptions(list)
      setOnAirOptions(onAirOpts)
      setNotOnAirOptions(notOnAirOpts)
    })
  }, [])

  return (
    <div className="select drag-area">
      <select onChange={onChangeRadioName}>
        <optgroup label="更新中">{onAirOptions}</optgroup>
        <optgroup label="更新終了">{notOnAirOptions}</optgroup>
      </select>
      <select>{episodes}</select>
    </div>
  )
}

export default Select
