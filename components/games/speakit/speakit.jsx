import React, { useState, useEffect } from 'react'
import { Header } from './header'
import { TenCards } from './tencards'
import { CardShow } from './cardshow'
import './index.less'
import { combineWords } from '../../../lib/crud/auth';


export function Speakit(props) {

  const [data, setData] = useState([]);
  const [startGame, setStartGame] = useState(false);
  const [star, setStar] = useState(0);
  const [guessed, setGuessed] = useState('');

  const startTheGame =() =>{
    setStartGame(true);
  };

  const iGuessedTheWord = (myWord) => {
    console.log('my ', myWord)
    setGuessed(myWord);
    setStar(star => star + 1);
  }

  useEffect(() => {
    combineWords(1,1).then((data) => {
      console.log(data);
      setData(data);
    });
  },[]);

  return (
    <div className='wrapper-speakit'>
      <Header star={star} start={startGame} />
      <div className='flex_column'>
        <CardShow iGuessedTheWord={iGuessedTheWord} startTheGame={startTheGame} data ={data}/>
        <TenCards guessed={guessed} data ={data} />
        <audio src={''} className='audio_word'></audio>
      </div>
    </div>
  )
}
