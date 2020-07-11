import React, { useContext } from 'react'
import { Context } from 'context'
import { PlayCard, ProgressBar } from 'components'
import './style.less'

export const Learn = () => {
  const { learnProgress } = useContext(Context)

  return (
    <div className='wrapper-box'>
      <PlayCard />
      <ProgressBar {...learnProgress} width='100%' />
    </div>
  )
}
