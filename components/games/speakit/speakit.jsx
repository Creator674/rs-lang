import React, { useState, useEffect } from 'react'
import { Header } from './header'
import { TenCards } from './tencards'
import { CardShow } from './cardshow'
import './index.less'
import { combineWords } from '../../../lib/crud/auth'
import { Card } from 'components/games/speakit/card'
import { cards } from '../../../../bogdanovich/bahdanovich-yauheni-RS2020Q1/english-for-kids/src/data/cards'

export function Speakit(props) {
  const [data, setData] = useState([])
  const [startGame, setStartGame] = useState(false)
  const [star, setStar] = useState(0)
  const [guessed, setGuessed] = useState('')

  const [successCards, setSuccessCards] = useState([])

  const addCard = card => {
    setSuccessCards([card, ...successCards])
  }
  const deleteCard = card => {
    setSuccessCards([successCards.filter(item => item !== card)])
  }

  const startTheGame = () => {
    setStartGame(true)
  }

  const iGuessedTheWord = myWord => {
    console.log('my ', myWord)
    setGuessed(myWord)
    setStar(star => star + 1)
  }

  useEffect(() => {
    combineWords(1, 1).then(data => {
      console.log(data)
      setData(data)
    })
  }, [])

  return (
    <div className='wrapper-speakit'>
      <Header star={star} start={startGame} />
      <div className='flex_column'>
        <CardShow addCard={addCard} iGuessedTheWord={iGuessedTheWord} startTheGame={startTheGame} data={data} />
        <TenCards guessed={guessed} data={data} />
        <Cards>
          {data.map((item, i) => {
            return (
              <Card
                // card props
                className={successCards.find(subItem => subItem === item) ? 'green' : 'yellow'}
              />
            )
          })}
        </Cards>
        <audio src={''} className='audio_word'></audio>
      </div>
    </div>
  )
}
