import React, { useState } from 'react'
import { RadioData } from './RadioData'

type SelectProps = {
  isPlaying: boolean
  currentNumber: number
  radioData: RadioData[]
  episodeOptions: JSX.Element[]
  onChangeRadio: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onChangeNumber: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

/**
 * ラジオの選択肢要素を作成
 *
 * @param radioData ラジオデータ
 * @param isNowOnAir 放送中かどうか
 * @returns ラジオの選択肢要素
 */
function createRadioOptions(
  radioData: RadioData[],
  isNowOnAir: boolean
): JSX.Element[] {
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

const Select = (props: SelectProps): JSX.Element => {
  const [nowOnAirRadioOptions] = useState(
    createRadioOptions(props.radioData, true)
  )
  const [noLongerOnAirRadioOptions] = useState(
    createRadioOptions(props.radioData, false)
  )

  return (
    <div className="select drag-area">
      <select disabled={props.isPlaying} onChange={props.onChangeRadio}>
        <optgroup label="放送中">{nowOnAirRadioOptions}</optgroup>
        <optgroup label="放送終了">{noLongerOnAirRadioOptions}</optgroup>
      </select>
      <select
        disabled={props.isPlaying}
        value={props.currentNumber}
        onChange={props.onChangeNumber}
      >
        {props.episodeOptions}
      </select>
    </div>
  )
}

export default React.memo(Select)
