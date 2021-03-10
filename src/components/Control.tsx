import React, { useCallback, useState } from 'react'

import playIcon from '../images/play_arrow-white-24dp.svg'
import pauseIcon from '../images/pause-white-24dp.svg'
import prevIcon from '../images/skip_previous-white-24dp.svg'
import nextIcon from '../images/skip_next-white-24dp.svg'
import openBrowserIcon from '../images/open_in_browser-white-24dp.svg'
import shuffleOnIcon from '../images/shuffle_on-white-24dp.svg'
import shuffleOffIcon from '../images/shuffle-white-24dp.svg'

type ControlProps = {
  isPlaying: boolean
  isShuffle: boolean
  url: string
  onNewPlay: (url: string) => void
  onPause: () => void
  onResume: () => void
  onIncNumber: () => void
  onDecNumber: () => void
  onClickShuffle: () => void
}

const Control = (props: ControlProps): JSX.Element => {
  const [url, setUrl] = useState('')

  const playCtrlIcon = props.isPlaying ? pauseIcon : playIcon
  const shuffleIcon = props.isShuffle ? shuffleOnIcon : shuffleOffIcon

  const handlePlayCtrlClick = useCallback(() => {
    // 新規再生
    if (props.url !== url) {
      setUrl(props.url)
      props.onNewPlay(props.url)
      return
    }

    // ポーズ・レジューム
    if (props.isPlaying) {
      props.onPause()
    } else {
      props.onResume()
    }
  }, [props, url])

  return (
    <div className="control">
      <input type="image" src={openBrowserIcon} />
      <span className="play-control">
        <input type="image" src={prevIcon} onClick={props.onDecNumber} />
        <input type="image" src={playCtrlIcon} onClick={handlePlayCtrlClick} />
        <input type="image" src={nextIcon} onClick={props.onIncNumber} />
      </span>
      <input type="image" src={shuffleIcon} onClick={props.onClickShuffle} />
    </div>
  )
}

export default React.memo(Control)
