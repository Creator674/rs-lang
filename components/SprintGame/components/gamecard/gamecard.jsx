import React, { useState } from 'react'; 
import './gamecard.less';


 function shuffledArray(length){
      const arr = Array.from({ length: length }, (_v, i=0) => i);
      for (let i = arr.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
}
 

export function Gamecard (props) {
    const state = { 
      count: 1,
      isCorrect: false,
    };
 

   return (
      <div className="wrapper-game">
        <div className="card">
             
        </div>

        <div className="game-bnts">
            <button className="true">true</button>
            <button className="false">false</button>
        </div>


        <audio src="" className="audio_word"></audio>
      </div>
   )
} 