import React, { useContext } from 'react'
import { Context } from 'context'
import { PlayCard, ProgressBar } from 'components'
import { withAuth } from '../HOC/hoc'
import './style.less'

export const LearnComponent = () => {
  const { learnProgress } = useContext(Context)

  return (
    <div className='wrapper-box'>
      <PlayCard />
      <ProgressBar {...learnProgress} width='100%' />
    </div>
  )
}

export const Learn = withAuth(LearnComponent)