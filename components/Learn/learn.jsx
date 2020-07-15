import React, { useContext, useState } from 'react'
import { Context } from 'context'
import { PlayCard, ProgressBar } from 'components'
import './style.less'

export const Learn = () => {
  const { learnProgress, words, cardSettings: {amountOfCards} } = useContext(Context)
  const [currIndex, setCurrIndex] = useState(0)
  const isWordOnLearning = words.indexOf(words.find(word => word.onLearning))
  if (isWordOnLearning !== -1) setCurrIndex(isWordOnLearning)

  function setCard(idx) {
    const prevIdx = idx - 1 >= 0 ? idx - 1 : 0
    const subWords = words.slice(prevIdx, idx + 1)
    return subWords.map((word, i ) => <PlayCard key={word.word} word={word} next={() => {
      setCurrIndex(currIndex+1)
      console.log('currIndex', currIndex)
    }}/>)
  }

  return (
    <div className='wrapper-box'>
      {words.length ? setCard(currIndex) : null }
      <ProgressBar {...learnProgress} total={amountOfCards} width='100%' />
    </div>
  )
}