import React, { useState } from 'react'; 
import './gamecard.less';
import {shuffledArray} from '../../../../../lib/helpers/shufflefunc'

 

export function Gamecard (props) {
    const state = { 
      count: 1,
      isCorrect: false,
    };
 
    const shufeledArray = shuffledArray();

   return (
      <div className="wrapper-game">
        <div className="card">
             <div className="card_title">
               <img src="./images/sprint/ok.png" alt="pic" width="30"></img>
               <p>+ 80 points</p>
             </div>
             <img src="./images/sprint/snail.png" alt="pic" width="70"></img>
             <div className="card_info">
               <p className="card_word">fuck off</p>
               <p className="card_trans">отстаньте</p>
             </div>
             <div className="border"></div>
             <div className="game-bnts">
              <button className="true">true</button>
              <button className="false">false</button>
            </div>
        </div>

        <audio src="" className="audio_word"></audio>
      </div>
   )
} 