import React from 'react'

const SeekBar = (): JSX.Element => {
  return (
    <div className="SeekBar">
      <span>00:00</span>
      <input
        className="input-range"
        type="range"
        value="0"
        min="0"
        max="100"
        step="1"
      />
      <span>24:00</span>
    </div>
  )
}

export default SeekBar
