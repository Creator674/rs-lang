import React from 'react'
import { Card } from '../card/card'
import './tenCards.less'

export const TenCards = ({ children }) => {
  return (
    <div className='column'>
      <div className='right'>{children}</div>
    </div>
  )
}
