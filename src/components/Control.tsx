import React, { useCallback, useState } from 'react'

import playIcon from '../images/play_arrow-white-24dp.svg'
import pauseIcon from '../images/pause-white-24dp.svg'
import skipPrevIcon from '../images/skip_previous-white-24dp.svg'
import skipNextIcon from '../images/skip_next-white-24dp.svg'
import openBrowserIcon from '../images/open_in_browser-white-24dp.svg'
import shuffleIcon from '../images/shuffle-white-24dp.svg'

type ControlProps = {
  isPlaying: boolean
  url: string
  onNewPlay: () => void
  onResume: () => void
  onPause: () => void
  onAddNumber: () => void
  onDecNumber: () => void
  onChangeStatus: (f: boolean) => void
}

const Control = (props: ControlProps): JSX.Element => {
  const [playCtrlIcon, setPlayCtrlIcon] = useState(playIcon)
  const [url, setUrl] = useState('')

  const handlePlayCtrlClick = useCallback(() => {
    // 新規再生
    if (props.url !== url) {
      setPlayCtrlIcon(pauseIcon)
      props.onChangeStatus(true)
      setUrl(props.url)
      props.onNewPlay()
      return
    }

    const isPlaying = !props.isPlaying
    if (isPlaying) {
      // レジューム
      setPlayCtrlIcon(pauseIcon)
      props.onResume()
    } else {
      // ポーズ
      setPlayCtrlIcon(playIcon)
      props.onPause()
    }
    props.onChangeStatus(isPlaying)
  }, [props, url])

  return (
    <div className="control">
      <input type="image" src={openBrowserIcon} />
      <span className="play-control">
        <input type="image" src={skipPrevIcon} onClick={props.onDecNumber} />
        <input type="image" src={playCtrlIcon} onClick={handlePlayCtrlClick} />
        <input type="image" src={skipNextIcon} onClick={props.onAddNumber} />
      </span>
      <input type="image" src={shuffleIcon} />
    </div>
  )
}

export default Control
