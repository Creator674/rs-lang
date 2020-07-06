import React, { useState, useEffect } from 'react'
import { Header } from '../../../components/games/header'
import { CardsContainer } from '../../../components/games/cardsContainer'
import { CardShow } from '../../../components/games/cardshow'
import { Card } from '../../../components/games/card'
import './index.less'
import { combineWords } from '../../../lib/crud/auth'
import { GameStartModalWindow} from '../../../components/GameStartModalWindow';

const Speakit = (props) => {
  const [data, setData] = useState([])
  const [startGame, setStartGame] = useState(false)
  const [star, setStar] = useState(0)
  const [guessed, setGuessed] = useState('')
  const [successCards, setSuccessCards] = useState([])
  const [restart, setRestart] = useState(false)

  const setGameEnd = (bool) => {
    if (bool) {
      console.log('END of the game')
    }
  }

  if (successCards.length === 10) {
    setGameEnd(true)
  }

  const addCard = (card) => {
    setSuccessCards((successCards) => {
      if (successCards.indexOf(card) === -1) {
        setStar((star) => star + 1)
        return [...successCards, card]
      }
      return successCards
    })
  }

  // const deleteCard = card => {
  //   setSuccessCards([successCards.filter(item => item !== card)]);
  // } ----- TODO --  funtion for deleting

  const startTheGame = () => {
    setStartGame(true)
  }
  console.log(successCards)

  const iGuessedTheWord = (myWord) => {
    setGuessed(myWord)
  }

  const restartTheGame = (bool) => {
    if (bool) {
      setStar(0)
      setGuessed('')
      setSuccessCards([])
      setRestart(true)
    }
  }

  useEffect(() => {
    combineWords(1, 1).then((data) => {
      setData(data.filter((el, ind) => ind < 10))
    })
  }, [])

  return (
    <div className='wrapper-speakit'>
      <GameStartModalWindow gameId={0} nameOfGame={'speakit'}/>

      <Header star={star} start={startGame} setGameEnd={setGameEnd} restart={restart} />
      <div className='flex_column'>
        <CardShow
          addCard={addCard}
          iGuessedTheWord={iGuessedTheWord}
          startTheGame={startTheGame}
          data={data}
          restartTheGame={restartTheGame}
          restart={restart}
        />
        <CardsContainer>
          {data.map((item, ind) => {
            return (
              <Card
                word={item.word}
                key={item.word}
                transcription={item.transcription}
                audioSrc={item.sound}
                guessed={guessed}
                successCards={successCards}
              />
            )
          })}
        </CardsContainer>
        <audio src={''} className='audio_word'></audio>
      </div>
    </div>
  )
}

export default Speakit
