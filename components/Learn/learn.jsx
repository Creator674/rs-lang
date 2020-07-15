import React, { useContext, useState, useRef } from 'react'
import { Context } from 'context'
import { PlayCard, ProgressBar } from 'components'
import {createUserWord, updateUserWord} from 'lib'
import './style.less'

export const Learn = () => {
  const { learnProgress, words, cardSettings: { amountOfCards, level } } = useContext(Context)
  const [currIndex, setCurrIndex] = useState(0)
  const isNew = useRef()

  const isWordOnLearning = words.indexOf(words.find(word => word.onLearning))

  if (isWordOnLearning !== -1) setCurrIndex(isWordOnLearning)

  function setNextCard(idx) {
    if (idx >= amountOfCards) {
      console.log('End of learning')
      return
    }

    if (words[idx].learnIndex === undefined) {
      words[idx].learnIndex = 20
      isNew.current = true
    }
    words[idx].level = level

    // const prevIdx = idx - 1 >= 0 ? idx - 1 : 0
    const subWords = words.slice(idx, idx + 1)
    return subWords.map((word, i ) => <PlayCard key={word.word} word={word} next={() => {
      setCurrIndex(currIndex+1)}} updateWordsDB={updateWordsDB} />)
  }

  const updateWordsDB = (word) => {
    if (isNew.current === true) {
        createUserWord(word).then(response => {
      })
    } else {
        updateUserWord(word).then(response => {
      })
    }
  }

  return (
    <div className='wrapper-box'>
      {words.length ? setNextCard(currIndex) : null }
      <ProgressBar {...learnProgress} total={amountOfCards} width='100%' />
    </div>
  )
}