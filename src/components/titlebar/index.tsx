import React from 'react'
import minimizeIcon from '../../images/minimize-white-18dp.svg'
import closeIcon from '../../images/close-white-18dp.svg'

const TitleBar = (): JSX.Element => (
  <div className="title-bar drag-area">
    <input
      type="image"
      src={minimizeIcon}
      onClick={window.api.WindowMinimize}
    />
    <input type="image" src={closeIcon} onClick={window.api.AppExit} />
  </div>
)

export default React.memo(TitleBar)
