import {Component} from 'react'

import './App.css'

import {tabsList, imagesList} from './data'

import Header from './components/Header'
import GameOver from './components/GameOver'
import Game from './components/Game'

const defaultValues = {
  activeTabId: tabsList[0].tabId,
  currentImageId: imagesList[0].id,
  score: 0,
  timer: 60,
  gameOver: false,
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

  onClickTab = activeTabId => this.setState({activeTabId})

  onClickThumbnail = id => {
    const {currentImageId} = this.state
    if (id !== currentImageId) {
      clearInterval(this.timerId)
      this.setState({gameOver: true})
    } else {
      this.generateRandomImage()
    }
  }

  generateRandomImage = () => {
    const index = Math.floor(Math.random() * imagesList.length)
    const currentImageId = imagesList[index].id
    const {score} = this.State
    this.setState({currentImageId, score: score + 1})
  }

  onClickGameOver = () => {
    this.setState({...defaultValues}, this.setTimerInterval)
  }

  render() {
    const {timer, score, gameOver, activeTabId, currentImageId} = this.state
    const thumbnailImagesList = imagesList.filter(
      imageDetails => imageDetails.category === activeTabId,
    )
    return (
      <div className="app-container">
        <Header score={score} timer={timer} />
        <div className="game-view-container">
          {gameOver ? (
            <GameOver score={score} onClick={this.onClickGameOver} />
          ) : (
            <Game
              tabs={tabsList}
              allImagesList={imagesList}
              thumbnailImages={thumbnailImagesList}
              activeTabId={activeTabId}
              currentImageId={currentImageId}
              onClickTab={this.onClickTab}
              onClickThumbnail={this.onClickThumbnail}
            />
          )}
        </div>
      </div>
    )
  }
}

export default App
