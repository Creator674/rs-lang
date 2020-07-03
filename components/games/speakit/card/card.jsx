import React, { useState, useEffect } from 'react';
import './card.less';

export const Card = props => {
 
    const { guessed, word, successCards, transcription, audioSrc } = props;

    useEffect(() => {
      if(guessed === word){
        setTimeout(() => {
          audioPlay();
        }, 1000);    
      }
    }, [guessed])

    const audioPlay = () => {
      const audio = new Audio();
      audio.src = audioSrc;
      audio.play();
    };

    return (
     		<div className={successCards.indexOf(word) !== -1 ? "card true" : "card"}>
     		    <div className="icon" onClick={() => audioPlay()}>
                 <img src="./images/speakit/play.png" />
               </div>
     		    <div className="text">
                 <p>  {word} </p>
                 <p>  {transcription} </p>
               </div>
     		</div>
     );
} 