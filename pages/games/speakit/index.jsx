import React, { useState, useEffect } from 'react'
import { Header } from '../../../components/games/header'
import { CardsContainer } from '../../../components/games/cardsContainer'
import { CardShow } from '../../../components/games/cardshow'
import { Card } from '../../../components/games/card'
import './index.less'
import { combineWords } from '../../../lib/crud/auth'
import { GameStartModalWindow} from '../../../components/GameStartModalWindow';
import { StatisticGames } from '../../../components/statisticGames'


const Speakit = (props) => {
  const [data, setData] = useState([])
  const [startGame, setStartGame] = useState(false)
  const [star, setStar] = useState(0)
  const [guessed, setGuessed] = useState('')
  const [successCards, setSuccessCards] = useState([])
  const [restart, setRestart] = useState(false)
  
  const [allGuessed, setAllGuessed] = useState([])
  const [allnotGuessed, setallnotGuessed] = useState([])
  const [showResults, setShowResults] = useState(false)


  const setGameEnd = (bool) => {
    if (bool) {
      console.log('END of the game');
      setShowResults(true);
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
    });
    const word = {}
    word.word = card
    data.map((item) => {
      if(item.word === card){
        word.transcription = item.transcription;
        word.translate = item.wordTranslate;
        word.audio = item.sound
      }
    });
    setAllGuessed((guessed) => {
      if (guessed.some((el) => el.word == word)) {
        return
      } else {
        return [...guessed, word]
      }
    });
    setallnotGuessed(allwords => allwords.filter(el => el.word !== card));
  }

  const startTheGame = () => {
    setStartGame(true)
  }

  const iGuessedTheWord = (myWord) => {
    setGuessed(myWord)
  }

  const restartTheGame = (bool) => {
    if (bool) {
      setStar(0)
      setGuessed('')
      setSuccessCards([])
      setRestart(true)
      setShowResults(false);
    }
  }

  useEffect(() => {
    combineWords(1, 1).then((data) => { 
      setData(data.filter((el, ind) => ind < 10));
      setallnotGuessed(data.filter((el, ind) => ind < 10)
        .map(el => {
          const word = {}
          word.word = el.word
          word.transcription = el.transcription;
          word.translate = el.wordTranslate;
          word.audio = el.sound
          return word
        }))
    })
  }, [])

  return (
    <div className='wrapper-speakit'>
      <GameStartModalWindow gameId={0} nameOfGame={'speakit'}/>
      {showResults && <StatisticGames allGuessed={allGuessed} allnotGuessed={allnotGuessed} />}

      <Header star={star} start={startGame} setGameEnd={setGameEnd} 
              restart={restart}  />
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
