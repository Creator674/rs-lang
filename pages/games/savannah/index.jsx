import React, { useState, useEffect } from 'react'
import { GameStartModalWindow } from '../../../components/GameStartModalWindow'
import { StatisticGames } from '../../../components/statisticGames'
import { getWordsAndTranslation } from '../../../lib/crud/auth'

import './savannah.less'

const Savannah = (props) => {
  const [data, setDate] = useState([])
  const [count, setCount] = useState(0)
  const [points, setPoints] = useState(0)
  const [words, setWords] = useState([])
  const [translation, setTranslation] = useState([])
  const [currentTranslation, setCurrentTranslation] = useState('')
  const [currentWord, setCurrentWord] = useState('')

  //  for statistic
  const [allGuessed, setAllGuessed] = useState([])
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    getWordsAndTranslation(1, 1)
      .then((data) => {
        console.log(data)
        setDate(data)
        setWords(data.map((el) => el[0]))
        setTranslation(data.map((el) => el[1]))
        addToArrayOfAnswers(data)
        return data
      })
      .catch((error) => error)
  }, [])

  const addToArrayOfAnswers = (data) => {
    setAllGuessed(
      data.map((el) => {
        const word = {}
        word.word = el[0]
        word.translate = el[1]
        word.correct = 0
        word.incorrect = 0
        return word
      })
    )
  }
  console.log(allGuessed)

  // if(gameEnd){
  //   setShowResults(true)
  // }

  return (
    <div className='savannah'>
      {/* <GameStartModalWindow gameId={1} nameOfGame={'savanna'}/> */}
      {/* {showResults && <StatisticGames allGuessed={allGuessed} />} */}

      <div className='savannah-main'>
        <div className='lifes'>
          <img src='/images/savannah/heart.png' alt='Your lifes' />
          <img src='/images/savannah/heart.png' alt='Your lifes' />
          <img src='/images/savannah/heart.png' alt='Your lifes' />
          <img src='/images/savannah/heart.png' alt='Your lifes' />
          <img src='/images/savannah/heart.png' alt='Your lifes' />
        </div>

        <div className='fallingWord'>
          <span>Falling Word</span>
        </div>

        <div className='listOfWords'>
          <ul>
            <li>First Word</li>
            <li>Second Word</li>
            <li>Third Word</li>
            <li>Fourth Word</li>
          </ul>
        </div>
      </div>

      <div className='drop'>
        <svg width='3rem' viewBox='0 0 30 42'>
          <path
            fill='#9ec6ea'
            stroke='#438ccd'
            strokeWidth='1.1'
            d='M15 3
                  Q16.5 6.8 25 18
                  A12.8 12.8 0 1 1 5 18
                  Q13.5 6.8 15 3z'
          />
        </svg>
      </div>

      <div className='bucketOfFlowers'>
        <img className='flover' src='/images/savannah/bucket.png' alt='Flowers feel bad without the water' />
      </div>
    </div>
  )
}

export default Savannah
