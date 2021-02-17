import React from 'react'
import TitleBar from './TitleBar'
import Select from './Select'
import SeekBar from './SeekBar'
import Control from './Control'
import '../styles/App.css'

const App = (): JSX.Element => {
  return (
    <div className="App">
      <div className="drag-area">
        <TitleBar />
        <Select />
      </div>
      <SeekBar />
      <Control />
    </div>
  )
}

export default App
