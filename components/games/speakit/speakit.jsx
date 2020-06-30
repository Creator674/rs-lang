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
  const [startGame, setStartGame] = useState(false);
  const [guessed, setGuessed] = useState('');

  const startTheGame =() =>{
    setStartGame(true);
  };

  const iGuessedTheWord = (myWord) => {
    console.log('my ', myWord)
    setGuessed(myWord);
  }

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
      <Header start={startGame} />
      <div className='flex_column'>
        <CardShow iGuessedTheWord={iGuessedTheWord} startTheGame={startTheGame} data ={data}/>
        <TenCards guessed={guessed} data ={data} />
        <audio src={''} className='audio_word'></audio>
      </div>
    </div>
  )
}
