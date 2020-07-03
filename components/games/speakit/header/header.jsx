import React, { useState, useEffect } from 'react'
import './header.less'

export const Header = ({start, star}) => {

  const [counter, setCounter] = useState(0);
  
  useEffect(() => {
    if(start){
      setCounter(500);
    } 
  },[start]);

  useEffect(() => { 
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000)
  }, [counter]);
   
  return (
    <div className='header'>
      <div className='header_column'>
        <span className='header_title'>SpeakIt</span>
      </div>

      <div className='header_column'>
        <div className='timer'>Time is left: <span>{start && counter}</span></div>
        <div className='score'>
          {Array(star).fill(<img src='./images/speakit/star1.png'/> )}
        </div>
      </div>
    </div>
  )
}