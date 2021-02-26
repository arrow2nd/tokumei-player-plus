import React from 'react'

import playIcon from '../images/play_arrow-white-24dp.svg'
import skipPrevIcon from '../images/skip_previous-white-24dp.svg'
import skipNextIcon from '../images/skip_next-white-24dp.svg'

type PlayControlProps = {
  onPlayClick: () => void
  onPauseClick: () => void
}

const PlayControl = (props: PlayControlProps): JSX.Element => {
  return (
    <span className="play-control">
      <input type="image" src={skipPrevIcon} />
      <input type="image" src={playIcon} onClick={props.onPlayClick} />
      <input type="image" src={skipNextIcon} />
    </span>
  )
}

export default PlayControl
