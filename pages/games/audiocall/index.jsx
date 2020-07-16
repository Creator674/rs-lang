import React, { useState, useEffect, useRef, useContext } from 'react'
import MobileStepper from '@material-ui/core/MobileStepper'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { Transition } from 'react-transition-group'
import { combineWords } from 'lib/crud/auth'
import { ButtonsList, ButtonAudio } from '../../../components/games/'
import { GameStartModalWindow } from '../../../components/GameStartModalWindow'
import { StatisticGames } from '../../../components/statisticGames'
import './index.less'

import { Context } from 'context'
import { saveStatistic } from 'lib'
import { addToStatisticfunc, gamesMiniStatistic } from '../../../lib/helpers/statisticHelp'

import { getLocalStorageProp, setLocalStorageProp } from 'lib/localStorage'

const theme = createMuiTheme({
  overrides: {
    MuiMobileStepper: {
      root: {
        background: 'transparent',
        padding: 0,
      },
      progress: {
        width: '100%',
      },
    },
    MuiLinearProgress: {
      colorPrimary: {
        backgroundColor: 'transparent',
      },
      barColorPrimary: {
        backgroundColor: '#FFF',
      },
    },
  },
})

const duration = 200

const fadeUp = {
  entered: { opacity: 1, bottom: 0, transform: 'translateX(-50%, -50%) scale(1)' },

  exited: { opacity: 0, bottom: '-110px', transform: 'translateX(-50%, 100%) scale(0)' },
}

const Audiocall = () => {
  const [activeStep, setActiveStep] = useState(-1)
  const [playWord, setPlayWord] = useState(null)
  const [isResult, toggleResult] = useState(false)
  const [wordsList, setWordsList] = useState([])
  const [gameStart, setGameStart] = useState(false)

  const [allGuessed, setAllGuessed] = useState([])
  const [allnotGuessed, setallnotGuessed] = useState([])
  const [showResults, setShowResults] = useState(false)

  const audio = useRef()
  const wordsDeck = useRef()

  const { appStatistics, setAppStatistics } = useContext(Context)

  const createStatistic = () => {
    allGuessed.map((el) => {
      const newStatistic = { ...appStatistics, id: addToStatisticfunc(appStatistics, el.id, 'audiocall', 'guessed') }
      setAppStatistics(newStatistic)
      saveStatistic(newStatistic)
    })
    allnotGuessed.map((el) => {
      const newStatistic = { ...appStatistics, id: addToStatisticfunc(appStatistics, el.id, 'audiocall', 'wrong') }
      setAppStatistics(newStatistic)
      saveStatistic(newStatistic)
    })
    const newMiniGameStatistic = { ...appStatistics, 'audiocall': gamesMiniStatistic(appStatistics, 'audiocall', allGuessed.length, allnotGuessed.length) }
    setAppStatistics(newMiniGameStatistic)
    saveStatistic(newMiniGameStatistic)
  }

  const getRandomWord = () => {
    if (activeStep >= 9) {
      setShowResults(true)
      createStatistic()
      return null
    }
    const idx = Math.floor(Math.random() * (wordsDeck.current.length - 1))

    if (!wordsDeck.current[idx].used) {
      const item = setWordAsUsed(idx)
      setPlayWord(item)
      return item
    }
    return getRandomWord()
  }

  const getRandomList = (id, arr = []) => {
    let randomList = arr
    while (randomList.length < 4) {
      const idx = Math.floor(Math.random() * (wordsDeck.current.length - 1))
      if (id !== wordsDeck.current[idx].id) randomList.push(idx)
    }
    randomList = [...new Set(randomList)]
    return randomList.length === 4 ? randomList : getRandomList(id, randomList)
  }

  const setWordAsUsed = (idx) => {
    if (idx < 0 || idx > wordsDeck.current.length)
      throw Error(`Word index must be greater or equal 0 and less than ${wordsDeck.length + 1}`)
    const word = wordsDeck.current[idx]
    word.used = true

    setActiveStep(activeStep + 1)
    return word
  }

  const setResult = (id, result) => {
    const word = wordsDeck.current.find((item) => item.id === id)
    const addWord = {}
    addWord.word = word.word
    addWord.transcription = word.transcription
    addWord.translate = word.wordTranslate
    addWord.audio = word.sound
    addWord.id = word.id
    if (result) {
      word.right = true
      setAllGuessed((guessed) => {
        if (guessed.some((el) => el.word == word)) {
          return
        } else {
          return [...guessed, addWord]
        }
      })
    } else {
      word.wrong = true
      setallnotGuessed((guessed) => {
        if (guessed.some((el) => el.word == word)) {
          return
        } else {
          return [...guessed, addWord]
        }
      })
    }
    toggleResult(true)
  }

  const setupPlayState = () => {
    const word = getRandomWord()
    if (word) {
      const randomList = getRandomList(word.id).map((idx) => wordsDeck.current[idx])
      const place = Math.floor(Math.random() * 5)
      const newList = [...randomList]
      newList.splice(place, 0, word)
      toggleResult(false)
      setWordsList(newList)
    }
  }

  const startTheTimer = () => {
    setGameStart(true)
    document.getElementById('audio1').play();
  }
  useEffect(() => {
      combineWords(1, 1)
        .then((data) => {
          wordsDeck.current = data
          setupPlayState()
        })
        .catch((error) => error)
  },[])

  const getAudioRef = () => audio.current

  if (!playWord) {
    return (
      <div className='game-box audiocall'>
        <div className=''>Loading...</div>
      </div>
    )
  }

  return (
    <div className='game-box audiocall'>
      <GameStartModalWindow gameId={2} nameOfGame={'audiocall'} startTheTimer={startTheTimer}/>
      {showResults && (
        <StatisticGames allGuessed={allGuessed} allnotGuessed={allnotGuessed} />
      )}

      <ThemeProvider theme={theme}>
        <MobileStepper variant='progress' steps={11} position='static' activeStep={activeStep} />
      </ThemeProvider>

      <div className='main'>
        <div className='word-board'>
          <Transition mountOnEnter={false} unmountOnExit={true} in={isResult} timeout={isResult ? duration : 0}>
            {(state) =>
              isResult && (
                <div
                  className='word'
                  style={{
                    transform: 'translateX(-50%, 100%) scale(0)',
                    transition: `all 100ms ease-in-out`,
                    opacity: 0,
                    bottom: '-110px',
                    transformOrigin: '50% 100%',
                    ...fadeUp[state],
                  }}
                >
                  <div className='word-image'>
                    <img src={playWord && playWord.image} alt={`Image for ${playWord && playWord.word} word`} />
                  </div>
                  {playWord && (
                    <span className='word-text'>
                      <ButtonAudio className='small' small getAudioRef={getAudioRef} /> <span>{playWord.word}</span>
                    </span>
                  )}
                </div>
              )
            }
          </Transition>

          <div className='audio-btn'>{!isResult && <ButtonAudio getAudioRef={getAudioRef} />}</div>
        </div>
        <div className='game-board'>
          <div className='words-container'>
            {wordsList.length && (
              <ButtonsList
                playWord={playWord}
                list={wordsList}
                isResult={isResult}
                handleClick={({ target }) => {
                  if (target.dataset.id === playWord.id) {
                    setResult(playWord.id, true)
                  } else {
                    setResult(playWord.id, false)
                  }
                }}
              />
            )}
          </div>
          <div className='button-container'>
            {!isResult ? (
              <button onClick={() => setResult(playWord.id, false)}>I don't know</button>
            ) : (
              <button onClick={() => setupPlayState()}>next</button>
            )}
          </div>
        </div>
      </div>
      <audio id='audio1' ref={audio} src={playWord && playWord.sound} autoPlay={gameStart} type='audio/mp3' />
    </div>
  )
}

export default Audiocall
