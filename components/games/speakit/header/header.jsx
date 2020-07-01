import React, { useState, useEffect } from 'react'
import './header.less'

export function Header({start, star}) {

  const [counter, setCounter] = useState(0);
  
  useEffect(() => {
    if(start){
      setCounter(500);
    }
  },[start]);

  useEffect(() => { 
    console.log(start)
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000)
  }, [counter]);
   
  const drawStars =() => {
    const arr = [];
    for(let i=0; i<star; i+=1) {
      arr.push(<img src='./images/speakit/star1.png'/> );
    }
    return arr;
  }

  return (
    <div className='header'>
      <div className='header_column'>
        <span className='header_title'>SpeakIt</span>
      </div>

      <div className='header_column'>
        <div className='timer'>Time is left: <span>{start && counter}</span></div>
        <div className='score'>
          { drawStars()  }
        </div>
      </div>
    </div>
  )
}
