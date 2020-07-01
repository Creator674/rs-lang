import React, { useState, useEffect } from 'react'
import './card.less'

export const Card = props => {
  const { isActive, word, transcription, translation } = props

  useEffect(() => {
    if (guessed === word) {
      setTimeout(() => {
        audioPlay()
      }, 1000)
    }
  }, [guessed])

  const audioPlay = () => {
    const audio = new Audio()
    audio.src = audioSrc
    audio.play()
  }

  return (
    <div className={guessed === word ? 'card true' : 'card'}>
      <div>{}</div>
      <div className='icon' onClick={() => audioPlay()}>
        <img src='./images/speakit/play.png' />
      </div>

      <div className='text'>
        <p> {word} </p>
        <p> {transcription} </p>
      </div>
    </div>
  )
}
