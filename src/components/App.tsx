import React from 'react'
import TitleBar from './TitleBar'
import Control from './Control'
import '../styles/App.css'

const App = (): JSX.Element => {
  return (
    <div className="App">
      <TitleBar />
      <Control />
    </div>
  )
}

export default App
