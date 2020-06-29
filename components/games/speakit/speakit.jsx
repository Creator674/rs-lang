import React, { useState, useEffect } from 'react'
import { Header } from './header'
import { TenCards } from './tencards'
import { CardShow } from './cardshow'
import './index.less'
import {getWordsTranslationAudioImg} from '../../../lib/crud/auth';


export function Speakit(props) {

  const [word, setWord] = useState();
  const [translation, setTranslation] = useState();
  const [audio, setAudio] = useState();
  const [image, setImage] = useState();


  useEffect(() => {
    getWordsTranslationAudioImg(1,1).then((data) => {
      console.log(data)
    });
  });

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
