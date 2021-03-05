import React, { useState } from 'react'

import playIcon from '../images/play_arrow-white-24dp.svg'
import pauseIcon from '../images/pause-white-24dp.svg'
import skipPrevIcon from '../images/skip_previous-white-24dp.svg'
import skipNextIcon from '../images/skip_next-white-24dp.svg'

type PlayControlProps = {
  isPlaying: boolean
  url: string
  setIsPlaying: (f: boolean) => void
  onNewPlay: () => void
  onResume: () => void
  onPause: () => void
}

const PlayControl = (props: PlayControlProps): JSX.Element => {
  const [playCtrlIcon, setPlayCtrlIcon] = useState(playIcon)
  const [url, setUrl] = useState('')

  const handlePlayCtrlClick = () => {
    // 新規再生
    if (props.url !== url) {
      setPlayCtrlIcon(pauseIcon)
      props.setIsPlaying(true)
      setUrl(props.url)
      props.onNewPlay()
      return
    }

    const flg = !props.isPlaying
    if (flg) {
      // レジューム
      setPlayCtrlIcon(pauseIcon)
      props.onResume()
    } else {
      // ポーズ
      setPlayCtrlIcon(playIcon)
      props.onPause()
    }
    props.setIsPlaying(flg)
  }

  return (
    <span className="play-control">
      <input type="image" src={skipPrevIcon} />
      <input type="image" src={playCtrlIcon} onClick={handlePlayCtrlClick} />
      <input type="image" src={skipNextIcon} />
    </span>
  )
}

export default PlayControl
