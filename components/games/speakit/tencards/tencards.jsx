import React, { useState, useEffect } from 'react'
import {Card} from '../card/card'
import './tenCards.less'

export function TenCards({guessed, data}) {

  const cardsArr = [];
  console.log(guessed)

  if(data.length){
    for (let i = 0; i < 10; i += 1) {
      cardsArr.push(<Card guessed={guessed} props={data[i]}/>)
    }
  }

  useEffect(() => {
    console.log(data)
  }, [])

  return (
    <div className='column'>
      <div className='right'>{cardsArr}</div>
    </div>
  )
}
