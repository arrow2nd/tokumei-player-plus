import React from 'react'

import playIcon from '../images/play_arrow-white-24dp.svg'
import skipPrevIcon from '../images/skip_previous-white-24dp.svg'
import skipNextIcon from '../images/skip_next-white-24dp.svg'
import openBrowserIcon from '../images/open_in_browser-white-24dp.svg'
import shuffleIcon from '../images/shuffle-white-24dp.svg'

const PlayControl = (): JSX.Element => {
  return (
    <span className="PlayControl">
      <input type="image" src={skipPrevIcon} />
      <input type="image" src={playIcon} />
      <input type="image" src={skipNextIcon} />
    </span>
  )
}

const Control = (): JSX.Element => {
  return (
    <div className="Control">
      <input type="image" src={openBrowserIcon} />
      <PlayControl />
      <input type="image" src={shuffleIcon} />
    </div>
  )
}

export default Control
