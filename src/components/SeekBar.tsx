import React, { useRef } from 'react'

const SeekBar = (): JSX.Element => {
  const seekRef = useRef<HTMLInputElement>(null)

  return (
    <div className="seek-bar">
      <span>00:00</span>
      <input
        className="input-range"
        type="range"
        ref={seekRef}
        defaultValue="0"
        min="0"
        max="100"
        step="1"
      />
      <span>24:00</span>
    </div>
  )
}

export default SeekBar
