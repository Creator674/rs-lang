import React, { useState, useEffect, useRef } from 'react'
import MobileStepper from '@material-ui/core/MobileStepper'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { Transition } from 'react-transition-group'
import { combineWords } from 'lib/crud/auth'
import { ButtonsList, ButtonAudio } from '../../../components/games/'
import { GameStartModalWindow} from '../../../components/GameStartModalWindow';
import './index.less'

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
  // const [usedCount, setUsedCount] = useState(0)
  const [isResult, toggleResult] = useState(false)
  const [wordsList, setWordsList] = useState([])

  const audio = useRef()
  const wordsDeck = useRef()
  // const wordsList = useRef()

  const getRandomWord = () => {
    if (activeStep >= 9) return null
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

    // setUsedCount(usedCount + 1)
    setActiveStep(activeStep + 1)
    return word
  }

  const setResult = (id, result) => {
    const word = wordsDeck.current.find((item) => item.id === id)
    if (result) word.right = true
    else word.wrong = true
    toggleResult(true)
  }

  const setupPlayState = () => {
    const word = getRandomWord()
    const randomList = getRandomList(word.id).map((idx) => wordsDeck.current[idx])
    const place = Math.floor(Math.random() * 5)
    const newList = [...randomList]
    newList.splice(place, 0, word)
    toggleResult(false)
    setWordsList(newList)
  }

  // useEffect(() => {
  //   if (!playWord) return
  //   // audio.current.play()
  // }, [playWord])

  useEffect(() => {
    combineWords(1, 1)
      .then((data) => {
        wordsDeck.current = data
        setupPlayState()
      })
      .catch((error) => error)
  }, [])

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
      <GameStartModalWindow gameId={2} nameOfGame={'audiocall'}/>
      
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
      <audio id='audio1' ref={audio} src={playWord && playWord.sound} autoPlay type='audio/mp3' />
    </div>
  )
}

export default Audiocall;