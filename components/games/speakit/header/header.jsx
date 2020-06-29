import React, { useState } from 'react'
import './header.less'

export function Header(props) {

  const [counter, setCounter] = React.useState(500)
  React.useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000)
  }, [counter])

  return (
    <div className='header'>
      <div className='header_column'>
        <span className='header_title'>SpeakIt</span>
      </div>

      <div className='header_column'>
        <div className='timer'>Time is left: <span>{counter}</span></div>
        <div className='score'>
          <img src='./images/speakit/star1.png' />
          {props.isguessed ? 'img src="./images/speakit/star1.png' : ''}
        </div>
      </div>
    </div>
  )
}
