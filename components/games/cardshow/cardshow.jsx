import React, { useState, useEffect } from 'react'
import './cardShow.less'

export const CardShow = (props) => {
  const { addCard, iGuessedTheWord, startTheGame, restartTheGame, restart, data } = props

  const [showResults, setShowResults] = useState(false) // ----TODO: for showing modal window
  const [gameStart, setGameStart] = useState(false)
  const [allData, setData] = useState([])
  const [words, setWords] = useState([])
  const [imageSrc, setImageSrc] = useState('')
  const [translation, setTranslation] = useState('')
  const [pronouncedWord, setPronouncedWord] = useState('')

  useEffect(() => {
    setData(data)
    setWords(data.map((el) => el.word))
  }, [startTheGame])

  const checkTheAnswer = (pronWord) => {
    const spokedWord = pronWord.toLowerCase()
    const ind = words.indexOf(spokedWord)
    if (ind !== -1) {
      setTranslation(allData[ind].wordTranslate)
      setImageSrc(allData[ind].image)
      iGuessedTheWord(spokedWord)
      addCard(spokedWord)
    }
  }

  const startGAME = () => {
    startTheGame()
    const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.interimResults = false
    recognition.maxAlternatives = 20
    recognition.lang = 'en-EN'
    recognition.continuous = false
    recognition.start()

    setGameStart(true)
    recognition.onresult = (e) => {
      const transcriptions = Array.from(e.results)
        .map((res) => res[0])
        .map((result) => result.transcript)
        .join('')
      setPronouncedWord((words) => (words = transcriptions))
      if (e.results[0].isFinal) {
        checkTheAnswer(transcriptions)
      }
    }
    recognition.addEventListener('end', recognition.start)
    recognition.onspeechend = () => {
      recognition.stop()
    }
  }

  const restartHandleClick = () => {
    restartTheGame(true)
    setPronouncedWord('')
    setTranslation('')
    setImageSrc('')
    // restartTheGame(false);
  }

  const showResultWindow = () => {
    setShowResults(true)
  }

  return (
    <div className='column'>
      <div className='cardShow-picture'>
        <img src={imageSrc ? imageSrc : '../images/speakit/start.png'} alt='pic' />
      </div>

      <p className='cardShow-translation'>{translation ? translation : ''}</p>
      <input
        type='text'
        className={gameStart ? 'cardShow-input go' : 'cardShow-input'}
        readOnly={true}
        value={pronouncedWord ? pronouncedWord : ''}
      />

      <div className='cardShow-btns-container'>
        <button
          className={gameStart ? 'btn cardShow-speak' : 'btn cardShow-speak speakPls'}
          onClick={() => startGAME()}
        >
          {gameStart ? 'SPEAK!' : 'Start the game'}
        </button>
        <button className='btn restart' onClick={() => restartHandleClick()}>
          Restart
        </button>
        <button className='btn results' onClick={() => showResultWindow()}>
          Results
        </button>
      </div>
    </div>
  )
}
