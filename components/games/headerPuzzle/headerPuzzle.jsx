import React, { useState } from 'react'
import './headerPuzzle.less'

export function HeaderPuzzle({ pronosBtnClicked, translBtnClicked, pictureBtnClicked, autopronBtnClicked }) {
  
  const [pronun, setPronun] = useState(false);
  const [trans, setTrans] = useState(false);
  const [show, setShow] = useState(false);
  const [auto, setAuto] = useState(false);

  const pronunciation = () =>{
    pronosBtnClicked();
    setPronun((click) => !click)
  }
  const translation = () =>{
    translBtnClicked();
    setTrans((click) => !click)
  }
  const showPicture = () =>{
    pictureBtnClicked();
    setShow((click) => !click)
  }
  const autoPronunc = () =>{
    autopronBtnClicked();
    setAuto((click) => !click)
  }

  return (
    <div className='puzzle-header'>
      <div className='puzzle_column'>
        <span className='puzzle_title'>Puzzle English</span>
      </div>

      <div className='puzzle_column row'>
        <button title='Prononsation-icon' 
                className={pronun ? 'pronunciation clicked': 'prononsation'}
                onClick={() => pronunciation()}>
          ♫
        </button>

        <button title='Translate the phrase' 
                className={trans ? 'translation clicked' : 'translation'}
                onClick={() =>translation()}>
          ↔
        </button>

        <button title='Show the image' 
                className={show ? 'picture clicked' : 'picture'}
                onClick={() =>showPicture()}>
          🎴
        </button>

        <button title='Auto-prononsation' 
                className={auto ? 'sentense-pron clicked' : 'sentense-pron'}
                onClick={() =>autoPronunc()}>
          🔊
        </button>
      </div>
    </div>
  )
}
