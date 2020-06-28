import React, { useState } from 'react'
import { Header } from './header'
import { TenCards } from './tencards'
import { CardShow } from './cardshow'
import './index.less'

export function Speakit(props) {

  return (
    <div className='wrapper-speakit'>
      <Header {...props} />
      <div className='flex_column'>
        <CardShow {...props} />
        <TenCards {...props} />
        <audio src={''} className='audio_word'></audio>
      </div>
    </div>
  )
}
