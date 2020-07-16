import React, { useState, useContext } from 'react'
import { HeaderSprint } from '../../../components/games/headerSprint'
import { Gamecard } from '../../../components/games/gamecard'
import { GameStartModalWindow } from '../../../components/GameStartModalWindow'
import { StatisticGames } from '../../../components/statisticGames'
import './index.less'


import { Context } from 'context'
import { saveStatistic } from 'lib'
import { addToStatisticfunc, gamesMiniStatistic } from '../../../lib/helpers/statisticHelp'

import { getLocalStorageProp, setLocalStorageProp } from 'lib/localStorage'

const Sprint = (props) => {
  const [startTimer, setStartTimer] = useState(false)
  const [allGuessed, setAllGuessed] = useState([])
  const [showResults, setShowResults] = useState(false)


  const { appStatistics, setAppStatistics } = useContext(Context)
  
  const createStatistic = () => {
    allGuessed.map(el => {
      const newStatistic = {...appStatistics, id: addToStatisticfunc(appStatistics, el.id, 'sprint', 'guessed')}
      setAppStatistics(newStatistic)
      saveStatistic(newStatistic)
    })
    const newMiniGameStatistic = { ...appStatistics, 'sprint': gamesMiniStatistic(appStatistics, 'sprint', allGuessed.length) }
    setAppStatistics(newMiniGameStatistic)
    saveStatistic(newMiniGameStatistic)
  }

  const startTheTimer = () => {
    setStartTimer(true)
  }
  const stopTimer = () => {
    setShowResults(true)
    setStartTimer(false)
    createStatistic()
  }

  const addToArrayOfAnswers = (data) => {
      setAllGuessed(data.map(el => {
         const word ={};
         word.word = el[0]
         word.translate = el[1]
         word.correct = 0;
         word.incorrect = 0;
         word.id =el[2]
         return word
      }))
  };

  const setIsCorrect = (answer, bool) => {
    setAllGuessed((guessed) => {
      if (bool) {
         guessed.map(el => {
            if(el.word === answer){
               el.correct += 1;
            }
            return el;
         })
      } else {
         guessed.map(el => {
            if(el.word === answer){
               el.incorrect += 1;
            }
            return el;
         })
      }
      return guessed;
    })
  }
  

  return (
    <div className='sprint-wrapper'>
      <GameStartModalWindow gameId={5} nameOfGame={'sprint'} startTheTimer={startTheTimer} />
      {showResults && <StatisticGames allGuessed={allGuessed} />}

      <HeaderSprint startTimer={startTimer} stopTimer={stopTimer} />
      <Gamecard
        addToArrayOfAnswers={addToArrayOfAnswers}
        setIsCorrect={setIsCorrect}
        stopTimer={stopTimer}
      />
    </div>
  )
}

export default Sprint
