import React, { useState, useEffect } from 'react'
import './buttonsLetters.less'

export const ButtonsLetters = ({guessed, handleClick}) => {
  return (
    <div>
        {'abcdefghijklmnopqrstuvwxyz'.split("").map(letter => (
           <button 
                 className='letter-btn'
                 key={letter} 
                 value={letter}
                 onClick={() => handleClick ? handleClick(letter) : null}
                 disabled={guessed.has(letter)}
                 > {letter}</button>
        ))}
     </div>
  )
}
