import React, { useCallback } from 'react'

import playIcon from '../images/play_arrow-white-24dp.svg'
import pauseIcon from '../images/pause-white-24dp.svg'
import prevIcon from '../images/skip_previous-white-24dp.svg'
import nextIcon from '../images/skip_next-white-24dp.svg'
import openIcon from '../images/open_in_browser-white-24dp.svg'
import shuffleOnIcon from '../images/shuffle_on-white-24dp.svg'
import shuffleOffIcon from '../images/shuffle-white-24dp.svg'

type ControlProps = {
  isPlaying: boolean
  isShuffle: boolean
  currentSrc: string
  changeEpisode: (step: number, isShuffle: boolean) => string
  onPlay: (url: string) => void
  onPause: () => void
  onResume: () => void
  onClickShuffle: () => void
  onClickOpenWebSite: () => void
}

const Control = (props: ControlProps): JSX.Element => {
  const playCtrlIcon = props.isPlaying ? pauseIcon : playIcon
  const shuffleIcon = props.isShuffle ? shuffleOnIcon : shuffleOffIcon

  const handleClickPlay = useCallback(() => {
    const nextUrl = props.changeEpisode(0, false)
    switch (true) {
      // 再生
      case props.currentSrc !== nextUrl:
        props.onPlay(nextUrl)
        break
      // ポーズ
      case props.isPlaying:
        props.onPause()
        break
      // レジューム
      default:
        props.onResume()
    }
  }, [props])

  const handleClickNext = useCallback(() => {
    props.changeEpisode(1, false)
  }, [props])

  const handleClickPrev = useCallback(() => {
    props.changeEpisode(-1, false)
  }, [props])

  return (
    <div className="control">
      <input type="image" src={openIcon} onClick={props.onClickOpenWebSite} />
      <span className="play-control">
        <input type="image" src={prevIcon} onClick={handleClickPrev} />
        <input type="image" src={playCtrlIcon} onClick={handleClickPlay} />
        <input type="image" src={nextIcon} onClick={handleClickNext} />
      </span>
      <input type="image" src={shuffleIcon} onClick={props.onClickShuffle} />
    </div>
  )
}

export default React.memo(Control)
