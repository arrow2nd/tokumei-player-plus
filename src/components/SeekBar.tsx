import React, { useMemo } from 'react'

type SeekBarProps = {
  currentTime: number
  durationTime: number
  onSeek: (time: number) => void
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

const SeekBar = (props: SeekBarProps): JSX.Element => {
  const currentTime = useMemo(() => {
    return createTimeStr(props.currentTime)
  }, [props.currentTime])

  const durationTime = useMemo(() => {
    return createTimeStr(props.durationTime)
  }, [props.durationTime])

  const handleSeek = (e: React.MouseEvent<HTMLInputElement>) => {
    props.onSeek(Number(e.currentTarget.value))
  }

  return (
    <div className="seek-bar">
      <span>{currentTime}</span>
      <input
        className="input-range"
        type="range"
        min="0"
        max={props.durationTime}
        step="1"
        onMouseUp={handleSeek}
      />
      <span>{durationTime}</span>
    </div>
  )
}

export default React.memo(SeekBar)
