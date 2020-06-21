import React, { useState } from 'react'
import { Rating } from '../rating/rating'
import './header.less'

export function Header(props) {
  const state = {
    level: '1',
    isguessed: props.isguessed,
  }

  const [counter, setCounter] = React.useState(500)
  React.useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000)
  }, [counter])

  return (
    <div className='header'>
      <div className='header_column'>
        <span className='header_title'>Check Level</span>
        <Rating />
      </div>

      <div className='header_column'>
        <div className='timer'>Time is left: {counter}</div>
        <div className='score'>
          <img src='./images/speakit/star1.png' />
          {state.isGuessed ? 'img src="./images/speakit/star1.png' : ''}
        </div>
      </div>
    </div>
  )
}
