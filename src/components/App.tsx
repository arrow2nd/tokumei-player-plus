import React from 'react'
import TitleBar from './TitleBar'
import UI from './UI'
import '../styles/App.css'

const App = (): JSX.Element => {
  return (
    <div className="App">
      <TitleBar />
      <UI />
    </div>
  )
}

export default App
