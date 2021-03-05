import React, { useState } from 'react'
import PlayControl from './PlayControl'
import Select from './Select'
import SeekBar from './SeekBar'
import { useAudio } from './useAudio'

import openBrowserIcon from '../images/open_in_browser-white-24dp.svg'
import shuffleIcon from '../images/shuffle-white-24dp.svg'

const Control = (): JSX.Element => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [url, setUrl] = useState('')
  const [currentTime, play, pause, resume, setCurrentTime] = useAudio()

  const changeUrl = (url: string) => {
    setUrl('https://omocoro.heteml.net/radio/' + url)
  }

  const handlePlay = () => {
    play(url)
  }

  return (
    <>
      <Select isPlaying={isPlaying} setUrl={changeUrl} />
      <SeekBar />
      <div className="control">
        <input type="image" src={openBrowserIcon} />
        <PlayControl
          isPlaying={isPlaying}
          setIsPlaying={(f: boolean) => setIsPlaying(f)}
          url={url}
          onNewPlay={handlePlay}
          onResume={resume}
          onPause={pause}
        />
        <input type="image" src={shuffleIcon} />
      </div>
    </>
  )
}

export default Control
