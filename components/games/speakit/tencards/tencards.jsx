import React, { useState } from 'react'
import Card from '../card/card'
import './tenCards.less'

export function TenCards(props) {
  let cardsArr = []
  for (let i = 0; i < 10; i += 1) {
    cardsArr.push(<Card {...props[i]} />)
  }

  return (
    <div className='column'>
      <div className='right'>{cardsArr}</div>
    </div>
  )
}
