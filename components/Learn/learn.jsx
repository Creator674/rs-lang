import React, { useContext, useState, useRef, useEffect } from 'react'
import { Context } from 'context'
import { PlayCard, ProgressBar } from 'components'
import { createUserWord, updateUserWord, saveSettings } from 'lib'
import { withModal } from 'components/HOC/hoc'
import './style.less'

const LearnComponent = ( { showModal } ) => {
  const { learnProgress, words, cardSettings: { amountOfCards, level, difficultOnly } } = useContext( Context )
  const { isModal } = useContext( Context )
  const [currIndex, setCurrIndex] = useState( 0 )
  const isNew = useRef()

  const isWordOnLearning = words.indexOf( words.find( word => word.onLearning ) )

  useEffect( () => {
    if ( isModal === true ) showModal()
  }, [isModal] )

  if ( isWordOnLearning !== -1 ) setCurrIndex( isWordOnLearning )

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
        words[idx].new = true
        isNew.current = true
      }
      words[idx].level = level
    }

    updateWordsDB( words[idx] )
    const subWords = words.slice( idx, idx + 1 )
    return subWords.map( ( word, i ) => <PlayCard key={word.id || word._id} word={word.optional ? word.optional : word} next={() => {
      setCurrIndex( currIndex + 1 )
    }} updateWordsDB={updateWordsDB} /> )
  }

  const updateWordsDB = ( word ) => {
    if ( isNew.current === true ) {
      isNew.current = false
      createUserWord( word ).then( response => {
      } ).catch( err => { } )
    } else {
      updateUserWord( word ).then( response => {
      } )
    }
  }

  return (
    <div className='wrapper-box'>
      {words.length ? setNextCard( currIndex ) : difficultOnly ?
        <div style={{ margin: '0 auto', fontSize: '3rem' }}>Your list of Hard words is empty</div>
        : null}
      <ProgressBar {...learnProgress} total={amountOfCards} width='100%' />
    </div>
  )
}

export const Learn = withModal( LearnComponent )