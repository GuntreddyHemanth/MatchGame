import {Component} from 'react'

import './App.css'

import Header from './components/Header'
import GameOver from './components/GameOver'

const defaultValues = {
  score: 0,
  timer: 60,
  gameOver: true,
}

class App extends Component {
  state = {
    ...defaultValues,
  }

  setTimerInterval = () => {
    this.timerId = setInterval(this.setTimer, 1000)
  }

  setTimer = () => {
    const {timer} = this.state
    if (timer > 0) {
      this.setState({timer: timer - 1})
    } else {
      clearInterval(this.timerId)
      this.setState({gameOver: true})
    }
  }

  onClickGameOver = () => {
    this.setState({...defaultValues}, this.setTimerInterval)
  }

  render() {
    const {timer, score, gameOver} = this.state
    return (
      <div className="app-container">
        <Header score={score} timer={timer} />
        <div className="game-view-container">
          {gameOver ? (
            <GameOver score={score} onClick={this.onClickGameOver} />
          ) : (
            true
          )}
        </div>
      </div>
    )
  }
}

export default App
