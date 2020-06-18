import React, { useState } from 'react';
import {Header} from './components/Header';
import {Footer} from './components/Footer';
import {Gameboard} from './components/gameboard';
import './index.less';




export function PuzzleGame(props) {

   return (
      <div className="wrapper">

         <Header {...props}/>

         <div className="phrase">
            <span ><img className="audio-transl" src="./images/play.png" width="40" alt="audio"/></span> 
            <p className="translation-text"></p> 
         </div>

         <Gameboard />
         <Footer />

         <audio src="" className="audio_word"></audio>
      </div>
   );
} 