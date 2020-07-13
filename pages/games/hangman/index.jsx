import React, { useState, useEffect, useContext } from 'react'
import './index.less'
import { Phrases } from '../../../components/games/phrases'
import { ButtonsLetters } from '../../../components/games/buttonsLetters'
import { shuffledArray } from '../../../lib/helpers/shufflefunc'
import { GameStartModalWindow } from '../../../components/GameStartModalWindow'
import { StatisticGames } from '../../../components/statisticGames'

import step0 from '../../../public/images/hangman/0.png'
import step1 from '../../../public/images/hangman/1.png'
import step2 from '../../../public/images/hangman/2.png'
import step3 from '../../../public/images/hangman/3.png'
import step4 from '../../../public/images/hangman/4.png'
import step5 from '../../../public/images/hangman/5.png'
import step6 from '../../../public/images/hangman/6.png'

import { Context } from 'context'
import { saveStatistic } from 'lib'
import { addToStatisticfunc, gamesMiniStatistic } from '../../../lib/helpers/statisticHelp'

import { getLocalStorageProp, setLocalStorageProp } from 'lib/localStorage'

const Hangman = (props) => {
  const maxWrong = 6
  const shuffled = shuffledArray(20)
  const images = [step0, step1, step2, step3, step4, step5, step6]

  const [win, setWin] = useState(false)
  const [next, setNext] = useState(false)
  const [stopHandling, setStopHandling] = useState(false)
  const [count, setCount] = useState(0)
  const [mistake, setMistake] = useState(0)
  const [clicks, setClicks] = useState(0)
  const [guessed, setGuessed] = useState(new Set([]))

  const [data, setData] = useState([])
  const [answer, setAnswer] = useState('')
  const [translate, setTranslate] = useState('')
  const [example, setExample] = useState('')

  const [allGuessed, setAllGuessed] = useState([])
  const [allnotGuessed, setallnotGuessed] = useState([])
  const [showResults, setShowResults] = useState(false)

  const gameOver = mistake >= maxWrong

  const { appStatistics, setAppStatistics } = useContext(Context)
  
  const createStatistic = () => {
    allGuessed.map(el => {
      const newStatistic = {...appStatistics, id: addToStatisticfunc(appStatistics, el.id, 'hangman', 'guessed')}
      setAppStatistics(newStatistic)
      saveStatistic(newStatistic)
    })
    allnotGuessed.map(el => {
      const newStatistic = {...appStatistics, id: addToStatisticfunc(appStatistics, el.id, 'hangman', 'wrong')}
      setAppStatistics(newStatistic)
      saveStatistic(newStatistic)
    })
    const newMiniGameStatistic = { ...appStatistics, 'hangman': gamesMiniStatistic(appStatistics, 'hangman', allGuessed.length, allnotGuessed.length) }
    setAppStatistics(newMiniGameStatistic)
    saveStatistic(newMiniGameStatistic)
  }


  useEffect(() => {
    if (next) {
      setCount(count + 1)
      setNext(false)
    }
    const values = Phrases().then((data) => {
      setData(data)
      setAnswer(data[0][shuffled[count]])
      setTranslate(data[1][shuffled[count]])
      setExample(data[2][shuffled[count]])
    })
    if (count + 1 > 10) {
      setShowResults(true)
      createStatistic()
    }
  }, [next])

  const handleClick = (value) => {
    setClicks(clicks + 1)
    if (answer.includes(value)) {
      setGuessed(guessed.add(value))
    } else {
      setMistake(mistake + 1)
    }
  }

  const guessedWord = () => {
    return (
      (answer &&
        answer.split('').map((letter, i) => (guessed.has(letter) ? <span key={i+letter}>{letter}</span> : <span key={i+letter}> </span>))) ||
      []
    )
  }

  const resetButton = () => {
    setMistake(0)
    setGuessed(new Set([]))
    setAnswer('')
    setWin(false)
    setStopHandling(false)
    setTimeout(() => {
      setNext(true)
    }, 80) 
  }

  let yourAnswer = ''
  let areYouRight = answer === yourAnswer

  useEffect(() => {
    [...guessedWord()].forEach((el) => {
      yourAnswer += el.props.children
    })
    if(answer){
      const word = {}
      word.word = answer
      word.example = data[4][data[0].indexOf(answer)]
      word.translate = translate
      word.id = data[3][data[0].indexOf(answer)]

      if (gameOver) {
        setallnotGuessed((notGuessed) => [...notGuessed, word])
        setStopHandling(true)
      } else if (answer !== '') {
        areYouRight = answer === yourAnswer
        if (areYouRight) {
          setAllGuessed((guessed) => {
            if (guessed.some((el) => el.word == word)) {
              return
            } else {
              return [...guessed, word]
            }
          })
          setWin(true)
          setStopHandling(true)
        }
      }
    }
  }, [clicks])

  return (
    <div className='hangman'>
      <GameStartModalWindow gameId={3} nameOfGame={'hangman'}/>
      {showResults && <StatisticGames allGuessed={allGuessed} allnotGuessed={allnotGuessed} />}

      <h1>Guess the Word or Die!</h1>

      <div className='row'>
        <div className='left'>
          <p className='guess' dangerouslySetInnerHTML={{ __html: example }}></p>
          <p>
            Wrong guesses: <span>{mistake}</span> of {maxWrong}
          </p>
          <div className='answer'>
            {!gameOver ? (
              guessedWord()
            ) : (
              <p>
                That was the word <b>'{answer}'</b> - means '{translate}'
              </p>
            )}
          </div>
        </div>

        <div className='right'>
          <img src={images[mistake]} alt='hang' />
        </div>
      </div>

      <div className='letters'>
        {win ? <p className='win'>You win! Congrats!</p> : ''}
        <div className='btns' id='btns'>
          {gameOver ? <p className='lose'>You fucked up! Try again</p> : ''}
          <ButtonsLetters handleClick={!stopHandling ? handleClick : null} guessed={guessed} />
        </div>
        <button className='reset' onClick={resetButton}>
           Next
        </button>
      </div>
    </div>
  )
}
export default Hangman
