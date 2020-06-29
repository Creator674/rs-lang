import React, { useState, useEffect } from 'react'
import { Header } from './header'
import { TenCards } from './tencards'
import { CardShow } from './cardshow'
import './index.less'
import { combineWords } from '../../../lib/crud/auth';


export function Speakit(props) {

  const [data, setData] = useState([]);
  const [word, setWord] = useState([]);
  const [translation, setTranslation] = useState([]);
  const [audio, setAudio] = useState([]);
  const [image, setImage] = useState([]);


  useEffect(() => {
    combineWords(1,1).then((data) => {
      console.log(data);
      setData(data);
      setWord(data.map(el => el.word));
      setTranslation(data.map(el => el.wordTranslate));
      setAudio(data.map(el => el.sound));
      setImage(data.map(el => el.image));
    });
  },[]);

  return (
    <div className='wrapper-speakit'>
      <Header {...props} />
      <div className='flex_column'>
        <CardShow {...props} />
        <TenCards {...data} />
        <audio src={''} className='audio_word'></audio>
      </div>
    </div>
  )
}
