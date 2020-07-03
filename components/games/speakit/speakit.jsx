import React, { useState, useEffect } from 'react'
import { Header } from './header'
import { CardsContainer } from './tencards'
import { CardShow } from './cardshow'
import {Card} from './card'
import './index.less'
import { combineWords } from '../../../lib/crud/auth';

export const Speakit = (props) => {

  const [data, setData] = useState([]);
  const [startGame, setStartGame] = useState(false);
  const [star, setStar] = useState(0);
  const [guessed, setGuessed] = useState('');
  const [successCards, setSuccessCards] = useState([]);
  const [restart, setRestart] = useState(false);

  const addCard = card => {
    setSuccessCards(successCards => {
      if(successCards.indexOf(card) === -1){
        setStar(star => star + 1);
        return [...successCards, card];
      }
      return successCards;
    });
  }

  // const deleteCard = card => {
  //   setSuccessCards([successCards.filter(item => item !== card)]);
  // } ----- TODO --  funtion for deleting

  const startTheGame =() =>{
    setStartGame(true);
  };
  console.log(successCards);


  const iGuessedTheWord = (myWord) => {
    setGuessed(myWord);
  }

  const restartTheGame = (bool) =>{
    if(bool){
      setStar(0);
      setGuessed('');
      setSuccessCards([]);
      setRestart(true);
    } else {
      setTimeout(() => {
        setRestart(false);
      }, 2000);
    }
  };

  useEffect(() => {
    combineWords(1,1).then((data) => {
      setData(data.filter((el, ind) => ind < 10));
    });
  },[]);

  return (
    <div className='wrapper-speakit'>
      <Header star={star} start={startGame} />
      <div className='flex_column'>
        <CardShow addCard={addCard} 
                  iGuessedTheWord={iGuessedTheWord} 
                  startTheGame={startTheGame} 
                  data ={data}
                  restartTheGame={restartTheGame}
                  restart={restart} />
        <CardsContainer>
          {data.map( (item, ind) => {
            return (
              <Card word={item.word}
                    key={item.word} 
                    transcription={item.transcription} 
                    audioSrc={item.sound} 
                    guessed={guessed}
                    successCards={successCards} 
              />
            )
           })
          }
        </CardsContainer>
        <audio src={''} className='audio_word'></audio>
      </div>
    </div>
  )
}