import {Component} from 'react'

import './App.css'

import Header from './components/Header'

const defaultValues = {
  score: 0,
  timer: 60,
}

class App extends Component {
  state = {
    ...defaultValues,
  }

  render() {
    const {timer, score} = this.setState
    return (
      <div className="app-container">
        <Header score={score} timer={timer} />
      </div>
    )
  }
}

export default App
