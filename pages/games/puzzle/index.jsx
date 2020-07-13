import React, { useState, useEffect, useContext } from 'react'
import { dataForPuzzle } from '../../../lib/crud/auth'
import { getPicture } from '../../../lib/helpers/getPicture'
import { GameStartModalWindow } from '../../../components/GameStartModalWindow'
import { HeaderPuzzle } from '../../../components/games/headerPuzzle'
import { GameboardPuzzle } from '../../../components/games/gameboardPuzzle'
import { FooterPuzzle } from '../../../components/games/footerPuzzle'
import { StatisticGames } from '../../../components/statisticGames'
import './index.less'

import { Context } from 'context'
import { saveStatistic } from 'lib'
import { addToStatisticfunc, gamesMiniStatistic } from '../../../lib/helpers/statisticHelp'

import { getLocalStorageProp, setLocalStorageProp } from 'lib/localStorage'


const Puzzle = (props) => {
  const [data, setData] = useState([])
  const [count, setCount] = useState(0)
  const [picture, setPicture] = useState('')

  const [pronunc, setPronunc] = useState(false)
  const [translat, setTranslat] = useState(false)
  const [showImage, setShowImage] = useState(false)
  const [autoPronunc, setAutoPronunc] = useState(false)
  const [readyToCheck, setReadyToCheck] = useState(false)
  const [goToNext, setGoToNext] = useState(false)
  const [dontKnow, setDontKnow] = useState(false)

  const [result, setResult] = useState([])
  const [mistakes, setMistakes] = useState([])

  const [allGuessed, setAllGuessed] = useState([])
  const [allnotGuessed, setallnotGuessed] = useState([])
  const [showResults, setShowResults] = useState(false)


  const { appStatistics, setAppStatistics } = useContext(Context)
  
  const createStatistic = () => {
    allGuessed.map(el => {
      const newStatistic = {...appStatistics, id: addToStatisticfunc(appStatistics, el.id, 'puzzle', 'guessed')}
      setAppStatistics(newStatistic)
      saveStatistic(newStatistic)
    })
    allnotGuessed.map(el => {
      const newStatistic = {...appStatistics, id: addToStatisticfunc(appStatistics, el.id, 'puzzle', 'wrong')}
      setAppStatistics(newStatistic)
      saveStatistic(newStatistic)
    })
    const newMiniGameStatistic = { ...appStatistics, 'puzzle': gamesMiniStatistic(appStatistics, 'puzzle', allGuessed.length, allnotGuessed.length) }
    setAppStatistics(newMiniGameStatistic)
    saveStatistic(newMiniGameStatistic)
  }


  const pronosBtnClicked = () => {
    setPronunc((pronunc) => !pronunc)
  }
  const translBtnClicked = () => {
    setTranslat((translat) => !translat)
  }
  const pictureBtnClicked = () => {
    // console.log('clicked picture show')
    setShowImage((showImage) => !showImage)
  }
  const autopronBtnClicked = () => {
    // console.log('clicked autoPronunc')
    setAutoPronunc((autoPronunc) => !autoPronunc)
  }

  useEffect(() => {
    dataForPuzzle(1, 1).then((data) => {
      setData(data.filter((el, ind) => ind < 10))
    })
    setPicture(getPicture(1))
  }, [])

  const goOn = (clientAnswer, phrase) => {
    setReadyToCheck(true)
    setResult([].concat([clientAnswer, phrase]))
  }

  const checktheAnswer = (result) => {
    // console.log(result)
    setReadyToCheck(true)
    const resultAnswer = result[0].join(' ')
    const word = {}
    word.phrase = resultAnswer
    word.translate = data[count].textTranslate
    word.audio = data[count].audio
    word.id = data[count].id

    if (resultAnswer === result[1].join(' ')) {
      // console.log('You did it!!!')
      setGoToNext(true)
      setAllGuessed((guessed) => {
        if (guessed.some((el) => el.phrase === resultAnswer)){
          return
        } else {
          return [...guessed, word]
        }
      })
    } else {
      setMistakes(
        result[1].filter((el, ind) => {
          if (el !== result[0][ind]) {
            return el
          }
        })
      )
      setallnotGuessed((guessed) => {
        if (guessed.some((el) => el.phrase === resultAnswer)){
           return
        } else {
          return [...guessed, word]
        }
      })
      setReadyToCheck(false)
    }
  };

  const clickOnNext = () => {
    setGoToNext(false)
    setReadyToCheck(false)
    setCount(count + 1)
    if(count === 9){
      // console.log('the end')
      setShowResults(true)
      createStatistic()
    }
  }
  const clickIdontKnow = () => {
    setDontKnow(true)
  }
  const dontKnowDone =()=>{
    setDontKnow(false)
  }

  return (
    <div className='puzzle-wrapper'>
      <GameStartModalWindow gameId={4} nameOfGame={'puzzleenglish'} />
      {showResults && <StatisticGames allGuessed={allGuessed} allnotGuessed={allnotGuessed} />}

      <HeaderPuzzle
        pronosBtnClicked={pronosBtnClicked}
        translBtnClicked={translBtnClicked}
        pictureBtnClicked={pictureBtnClicked}
        autopronBtnClicked={autopronBtnClicked}
      />

      <GameboardPuzzle
        pronunc={pronunc}
        translat={translat}
        showImage={showImage}
        autoPronunc={autoPronunc}
        data={data[count]}
        dontKnow={dontKnow}
        goOn={goOn}
        goToNext={goToNext}
        picture={picture}
        mistakes={mistakes}
        dontKnowDone={dontKnowDone}
      />

      <FooterPuzzle
        checktheAnswer={checktheAnswer}
        clickOnNext={clickOnNext}
        goToNext={goToNext}
        result={result}
        clickIdontKnow={clickIdontKnow}
        readyToCheck={readyToCheck}
      />
    </div>
  )
}

export default Puzzle
