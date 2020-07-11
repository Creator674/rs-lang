import React, { useState, useEffect } from 'react'
import { dataForPuzzle } from '../../../lib/crud/auth'
import { getPicture } from '../../../lib/helpers/getPicture'
import { GameStartModalWindow } from '../../../components/GameStartModalWindow'
import { HeaderPuzzle } from '../../../components/games/headerPuzzle'
import { GameboardPuzzle } from '../../../components/games/gameboardPuzzle'
import { FooterPuzzle } from '../../../components/games/footerPuzzle'
import './index.less'

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

  const pronosBtnClicked = () => {
    console.log('clicked pronnciation')
    setPronunc((pronunc) => !pronunc)
  }
  const translBtnClicked = () => {
    console.log('clicked translation')
    setTranslat((translat) => !translat)
  }
  const pictureBtnClicked = () => {
    console.log('clicked picture show')
    setShowImage((showImage) => !showImage)
  }
  const autopronBtnClicked = () => {
    console.log('clicked autoPronunc')
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
    console.log(result)
    setReadyToCheck(true)
    if (result[0].join('') === result[1].join('')) {
      console.log('You did it!!!')
      setGoToNext(true)
      setReadyToCheck(false)
    } else {
      setMistakes(
        result[1].filter((el, ind) => {
          if (el !== result[0][ind]) {
            return el
          }
        })
      )
    }
    //  checking the answer
  }

  const clickOnNext = () => {
    setGoToNext(false)
    setCount(count + 1)
  }
  const clickIdontKnow = () => {
    setDontKnow(true)
  }

  return (
    <div className='puzzle-wrapper'>
      <GameStartModalWindow gameId={4} nameOfGame={'puzzleenglish'} />

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
