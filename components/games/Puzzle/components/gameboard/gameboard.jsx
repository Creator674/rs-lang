import React, { useState } from 'react'; 
import './gameboard.less';
// import {shuffledArray} from '../../../../../lib/helpers'

 
export function Gameboard (props) {
    const state = { 
      count: 1,
      isCorrect: false,
    };

    // const shuffeledArr = shuffledArray();

    function getPicture(level) {
      const imagePerPage = [45, 41, 40, 29, 29, 25];
      const lev = Number(level) + 1;
      let random =  Math.floor(Math.random() * imagePerPage[+level] ); 
      if(random<10){
        random = `0${random}`;
      }
      const url = `https://raw.githubusercontent.com/davinchick/rslang_data_paintings/master/level${lev}/${lev}_${random}.jpg`;
      document.querySelector(".guessed_phrases_board").style.backgroundImage = `url(${url})`;
    }
 

   return (
      <div className="wrapper-game">
        <div className="phrase">
             <span >
                <img className={`audio-transl ${props.pronosBtnClicked ? "hidden" : ""}`} 
                  src="/images/puzzle/play.png" width="30" alt="audio"
                   />
             </span> 

             <p className={`translation-text ${props.translBtnClicked ? "visibilityHid" : ""}`}>
                {/* {TODO: props.phrases[state.count].sentenceTransl */}
                перевод
             </p> 
        </div>

        <div className="gameboard-cont">
            <div className="guessed_phrases_board">
              <div className="guessed">
                {/* {TODO: backgroundImage = picture!!!!} */}
                <span>угаданные слова</span>
              </div>
            </div>

            <div className="gameboard">
              
              <div className="word-container">
                 {/* {TODO: createPhrase(phrase)} */}
                 <span>Drag from here ----- ></span>
              </div>  
              <div className="answ-wrapper">
                  {drawAnswer()} 
              </div> 
            </div>
        </div>

        <audio src="" className="audio_word"></audio>
      </div>
   )
} 