import React, { useState } from 'react'
import './headerPuzzle.less'

export function HeaderPuzzle({ pronosBtnClicked, translBtnClicked, pictureBtnClicked, autopronBtnClicked }) {
  
  const pronunciation = () =>{
    pronosBtnClicked();
    // console.log(this)
    // event.target.classList.toggle('clicked');
  }
  const translation = () =>{
    translBtnClicked();
  }
  const showPicture = () =>{
    pictureBtnClicked();
  }
  const autoPronunc = () =>{
    autopronBtnClicked();
  }

  return (
    <div className='puzzle-header'>
      <div className='puzzle_column'>
        <span className='puzzle_title'>Puzzle English</span>
      </div>

      <div className='puzzle_column row'>
        <button title='Prononsation-icon' 
                className='prononsation'
                onClick={() => pronunciation()}>
          ♫
        </button>

        <button title='Translate the phrase' 
                className='translation'
                onClick={() =>translation()}>
          ↔
        </button>

        <button title='Show the image' 
                className='picture'
                onClick={() =>showPicture()}>
          🎴
        </button>

        <button title='Auto-prononsation' 
                className='sentense-pron'
                onClick={() =>autoPronunc()}>
          🔊
        </button>
      </div>
    </div>
  )
}
