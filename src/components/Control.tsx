import React from 'react'
import PlayControl from './PlayControl'
import Select from './Select'
import SeekBar from './SeekBar'
import { useAudio } from './useAudio'

import openBrowserIcon from '../images/open_in_browser-white-24dp.svg'
import shuffleIcon from '../images/shuffle-white-24dp.svg'

const Control = (): JSX.Element => {
  const [
    isPlaying,
    currentTime,
    play,
    pause,
    setSrc,
    setCurrentTime
  ] = useAudio()

  const handleSetSrc = (url: string) => {
    setSrc('https://omocoro.heteml.net/radio/' + url)
  }

  const handlePlay = () => {
    play()
  }

  const handlePause = () => {
    pause()
  }

  const handleSeek = (ctime: number) => {
    setCurrentTime(ctime)
  }

  return (
    <>
      <Select setSrc={handleSetSrc} />
      <SeekBar />
      <div className="control">
        <input type="image" src={openBrowserIcon} />
        <PlayControl onPlayClick={handlePlay} onPauseClick={handlePause} />
        <input type="image" src={shuffleIcon} />
      </div>
    </>
  )
}

export default Control
