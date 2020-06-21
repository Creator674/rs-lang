import React, { useState } from 'react'
import { Header } from './header'
import { TenCards } from './tencards'
import { CardShow } from './cardshow'
import './index.less'

export function Speakit(props) {
  const state = {
    isPlayed: true,
    level: '1',
    audioSrc: '...',
  }

  // played = () =>{
  //    audio.play();
  // };

  return (
    <div className='wrapper'>
      <Header {...props} />
      <div className='flex_column'>
        <CardShow {...props} />
        <TenCards {...props} />
        <audio src={state.audioSrc} className='audio_word'></audio>
      </div>
    </div>
  )
}
