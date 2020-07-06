import React, { useState, useEffect } from 'react'
import './header.less'

export const Header = ({ start, star, setGameEnd, restart }) => {
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    if (start) {
      setCounter(200)
    }
    if (restart) {
      setCounter(200)
    }
  }, [start])

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000)
    if (start && counter < 1) {
      setGameEnd(true)
    }
  }, [counter])

  return (
    <div className='speakit-header'>
      <div className='speakit-header_column'>
        <span className='speakit-header_title'>SpeakIt</span>
      </div>

      <div className='speakit-header_column'>
        <div className='timer'>
          Time is left: <span>{start && counter}</span>
        </div>
        <div className='score'>{Array(star).fill(<img src='../images/speakit/star1.png' />)}</div>
      </div>
    </div>
  )
}