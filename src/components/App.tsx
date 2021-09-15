import React from 'react'
import TitleBar from './titlebar'
import UI from './ui'
import '../styles/App.css'

const App = (): JSX.Element => (
  <div className="App">
    <TitleBar />
    <UI />
  </div>
)

export default App
