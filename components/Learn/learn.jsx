import React, { useContext } from 'react'
import { Context } from 'context'
import { PlayCard, ProgressBar } from 'components'
import './style.less'

export const Learn = () => {
  const { learnProgress, words } = useContext(Context)
  console.log(learnProgress)
  return (
    <div className='wrapper-box'>
      {words.length ? <PlayCard word={words[0]}/> : null }
      <ProgressBar {...learnProgress} width='100%' />
    </div>
  )
}