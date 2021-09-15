import React, { useMemo, useState } from 'react'
import { createTimeStr } from './createTimeStr'

type SeekBarProps = {
  currentTime: number
  durationTime: number
  onSeek: (time: number) => void
}

const SeekBar = (props: SeekBarProps): JSX.Element => {
  const [isDuringSeek, setIsDuringSeek] = useState(false)
  const [seekTime, setSeekTime] = useState(0)

  const currentTime = useMemo(
    () => createTimeStr(props.currentTime),
    [props.currentTime]
  )

  const durationTime = useMemo(
    () => createTimeStr(props.durationTime),
    [props.durationTime]
  )

  // シーク開始
  const handleSeekStart = () => setIsDuringSeek(true)

  // シーク終了
  const handleSeekFinish = () => {
    props.onSeek(seekTime)
    setTimeout(() => setIsDuringSeek(false), 1000)
  }

  // シーク中
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.currentTarget.value)
    if (time !== seekTime) setSeekTime(time)
  }

  return (
    <div className="seek-bar">
      <span className="time">{currentTime}</span>
      <input
        className="input-range"
        type="range"
        min="0"
        max={props.durationTime}
        step="1"
        value={isDuringSeek ? seekTime : props.currentTime}
        onChange={handleSeek}
        onMouseDown={handleSeekStart}
        onMouseUp={handleSeekFinish}
      />
      <span className="time">{durationTime}</span>
    </div>
  )
}

export default React.memo(
  SeekBar,
  (prev, next) => prev.currentTime === next.currentTime
)
