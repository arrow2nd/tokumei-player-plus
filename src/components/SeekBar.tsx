import React, { useMemo, useState } from 'react'

type SeekBarProps = {
  currentTime: number
  durationTime: number
  onSeek: (time: number) => void
}

const SeekBar = (props: SeekBarProps): JSX.Element => {
  const [isDuringSeek, setIsDuringSeek] = useState(false)
  const [seekTime, setSeekTime] = useState(0)

  const currentTime = useMemo(() => {
    return createTimeStr(props.currentTime)
  }, [props.currentTime])

  const durationTime = useMemo(() => {
    return createTimeStr(props.durationTime)
  }, [props.durationTime])

  // シーク開始
  const handleSeekStart = () => {
    setIsDuringSeek(true)
  }

  // シーク終了
  const handleSeekFinish = () => {
    props.onSeek(seekTime)
    setTimeout(() => setIsDuringSeek(false), 1000)
  }

  // シーク中
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.currentTarget.value)
    if (time !== seekTime) {
      setSeekTime(time)
    }
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

/**
 * 秒数からmm:ss形式の文字列を作成
 *
 * @param sec 秒数
 * @returns 時間文字列
 */
function createTimeStr(sec: number) {
  const minStr = String(Math.floor(sec / 60)).padStart(2, '0')
  const secStr = String(Math.floor(sec % 60)).padStart(2, '0')
  return `${minStr}:${secStr}`
}

export default React.memo(
  SeekBar,
  (prev, next) => prev.currentTime === next.currentTime
)
