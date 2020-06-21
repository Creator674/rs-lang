import React, { useState } from 'react'
import {Button} from '../Button'
import './gamemodal.less'



export const GameStartModalWindow = (props) => {

   // const { gameId, nameOfGame, isStart } = props;
   
   const games = ["speakit", "savanna", "audiocall", "ourgame", "puzzleenglish", "sprint"];
   const colors = ["#d9c4ff", "#ff9292", "#000000", "#e44b63", "#689c8e", "#bbbf74"];
   const colorsParagr = ["#777272", "#ffc4c4", "#9e7a47", "#c52740", "#636ece", "#6a7775"];

   const nameOfGame = "sprint";   // - можно потестить поменять слова
   const gameId = 5;
   let text = "";

   const sectionStyle = {
      backgroundImage: `url(./images/gamestart/${ nameOfGame }.svg)`
    };
    const colorText = {
      color: colors[gameId]
    };

   switch (nameOfGame) {
      case "speakit":
         text = ( <div >
                     <h1 style={{color : (colors[gameId]) }}>SpeakIt</h1>
                     <p style={{color : (colorsParagr[gameId]) }}>Click on the words to hear them sound. <br></br>
                     Click on the button and speak the words into the microphone.</p>
               </div>);
         break;
      case "savanna":
         text = ( <div>
                     <h1 style={{color : (colors[gameId]) }}>Savanna</h1>
                     <p style={{color : (colorsParagr[gameId]) }} >Choose the right answer before time runs out. <br></br>
                     You can click on it with the mouse or use the keyboard keys: 1, 2, 3, 4.</p>
               </div>);
         break;
      case "puzzleenglish":
         text = ( <div>
                     <h1 style={{color : (colors[gameId]) }}>Puzzle English</h1>
                     <p style={{color : (colorsParagr[gameId]) }}>Click on words, collect phrases. <br></br>
                     Words can be drag and drop. Select tooltips in the menu</p>
               </div>);
         break;
      case "sprint":
         text = ( <div>
                     <h1 style={{color : (colors[gameId]) }}>Puzzle EnglishSprint</h1>
                     <p style={{color : (colorsParagr[gameId]) }}>Click on words, collect phrases. <br></br>
                     Words can be drag and drop. Select tooltips in the menu</p>
               </div>);
         break;
      case "audiocall":
         text = ( <div>
                     <h1 style={{color : (colors[gameId]) }}>AudioCall</h1>
                     <p style={{color : (colorsParagr[gameId]) }}>You hear the word and see 5 options for translating it.  <br></br>
                     Your task is to choose the correct translation of the spoken word.</p>
               </div>);
         break;
      case "ourgame":
         text = ( <div>
                     <h1 style={{color : (colors[gameId]) }}>Super puper game?</h1>
                     <p style={{color : (colorsParagr[gameId]) }}>Click on words, and wait.... <br></br>
                     Until smth will happened</p>
               </div>);
         break;  
      default:
         break;
   }
    
    

   return (
       <div className={nameOfGame + " start"} style={ sectionStyle }>
          <div className="darken">
             <div className="title">
                 {text}
                 <Button className="start-btn">Start</Button>
             </div>
          </div>
       </div>
   )
 }