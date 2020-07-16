import React, { useContext, useState, useRef } from 'react'
import { Context } from 'context'
import { PlayCard, ProgressBar } from 'components'
import { createUserWord, updateUserWord } from 'lib'
import './style.less'

export const Learn = () => {
  const { learnProgress, words, cardSettings: { amountOfCards, level } } = useContext( Context )
  const [currIndex, setCurrIndex] = useState( 0 )
  const isNew = useRef()

  const isWordOnLearning = words.indexOf( words.find( word => word.onLearning ) )

  if ( isWordOnLearning !== -1 ) setCurrIndex( isWordOnLearning )

  console.log( { words } )

  function setNextCard( idx ) {
    if ( idx >= amountOfCards ) {
      console.log( 'End of learning' )
      return
    }

    if ( !words[idx] ) return

    if ( words[idx].optional ) {
      if ( words[idx].optional.learnIndex === undefined ) {
        words[idx].optional.learnIndex = 20
        isNew.current = true
      }
      words[idx].optional.level = level
    } else {
      if ( words[idx].learnIndex === undefined ) {
        words[idx].learnIndex = 20
        isNew.current = true
      }
      words[idx].level = level
    }

    updateWordsDB( words[idx] )
    // const prevIdx = idx - 1 >= 0 ? idx - 1 : 0
    const subWords = words.slice( idx, idx + 1 )
    return subWords.map( ( word, i ) => <PlayCard key={word.id || word._id} word={word.optional ? word.optional : word} next={() => {
      setCurrIndex( currIndex + 1 )
    }} updateWordsDB={updateWordsDB} /> )
  }

  const updateWordsDB = ( word ) => {
    if ( isNew.current === true ) {
      isNew.current = false
      createUserWord( word ).then( response => {
        console.log( response )
      } ).catch( err => { } )
    } else {
      updateUserWord( word ).then( response => {
        console.log( response )
      } )
    }
  }

  return (
    <div className='wrapper-box'>
      {words.length ? setNextCard( currIndex ) : null}
      <ProgressBar {...learnProgress} total={amountOfCards} width='100%' />
    </div>
  )
}