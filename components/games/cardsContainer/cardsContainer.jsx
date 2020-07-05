import React from 'react'
import './cardsContainer.less'

export function CardsContainer({children}) {
  return (
    <div className='column'>
      <div className='right'>
        {children}
      </div>
    </div>
  )
}