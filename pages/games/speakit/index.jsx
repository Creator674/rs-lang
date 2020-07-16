import React, { useState, useEffect, useContext } from 'react'
import { Header } from '../../../components/games/header'
import { CardsContainer } from '../../../components/games/cardsContainer'
import { CardShow } from '../../../components/games/cardshow'
import { Card } from '../../../components/games/card'
import './index.less'
import { combineWords } from '../../../lib/crud/auth'
import { addToStatisticfunc, gamesMiniStatistic } from '../../../lib/helpers/statisticHelp'
import { GameStartModalWindow} from '../../../components/GameStartModalWindow';
import { StatisticGames } from '../../../components/statisticGames'

import { Context } from 'context'
import { saveStatistic } from 'lib'


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
  const [gameStart, setGameStart] = useState(false)

 
  
  const { appStatistics, setAppStatistics } = useContext(Context)
  
  const createStatistic = () => {
    allGuessed.map(el => {
      const newStatistic = {...appStatistics, id: addToStatisticfunc(appStatistics, el.id, 'speakit', 'guessed')}
      setAppStatistics(newStatistic)
      saveStatistic(newStatistic)
    })
    allnotGuessed.map(el => {
      const newStatistic = {...appStatistics, id: addToStatisticfunc(appStatistics, el.id, 'speakit', 'wrong')}
      setAppStatistics(newStatistic)
      saveStatistic(newStatistic)
    })
    const newMiniGameStatistic = { ...appStatistics, 'speakit': gamesMiniStatistic(appStatistics, 'speakit', allGuessed.length, allnotGuessed.length) }
    setAppStatistics(newMiniGameStatistic)
    saveStatistic(newMiniGameStatistic)
  }


  const setGameEnd = (bool) => {
    if (bool) {
      setShowResults(true);
      createStatistic()
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
        word.id = item.id
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

  const startTheTimer = () => {
    setGameStart(true)
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
          word.id = el.id
          return word
        }))
    })
  }, [])

  return (
    <div className='wrapper-speakit'>
      <GameStartModalWindow gameId={0} nameOfGame={'speakit'}/>
      {showResults && <StatisticGames startTheTimer={startTheTimer} allGuessed={allGuessed} allnotGuessed={allnotGuessed} />}

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
