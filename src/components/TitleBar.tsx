import React from 'react'

import minimizeIcon from '../images/minimize-white-18dp.svg'
import closeIcon from '../images/close-white-18dp.svg'

const TitleBar = (): JSX.Element => {
  const handleMinimizeClick = () => {
    console.log('minimize')
  }

  const handleCloseClick = () => {
    console.log('close')
  }

  return (
    <div className="title-bar drag-area">
      <input type="image" src={minimizeIcon} onClick={handleMinimizeClick} />
      <input type="image" src={closeIcon} onClick={handleCloseClick} />
    </div>
  )
}

export default TitleBar
