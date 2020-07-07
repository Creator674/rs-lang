import React, { useState } from 'react'
import {Button} from '../Button'
import './gamemodal.less'

export const GameStartModalWindow = props => {
   const { gameId, nameOfGame, startTheTimer } = props;
   
   // const games = ["speakit", "savanna", "audiocall", "hangman", "puzzleenglish", "sprint"];
   const colors = ["#ffe0b3", "#ff9292", "#e3e299b5", "#895860", "#536f6f", "#907468"];
   const colorsParagr = ["#9d98ae", "#ffc4c4", "#876078", "#b9b9b9", "#aaaaaa", "#ffd5c8cc"];
   const sectionStyle = `url(/images/gamestart/${ nameOfGame }.svg)`; 
   
   let text = "";
   const [startModal, setStartModal] = useState(true);
   

   switch (nameOfGame) {
      case "speakit":
         text = ( <div >
                     <h1 style={{color : (colors[gameId]) }}>SpeakIt</h1>
                     <p style={{color : (colorsParagr[gameId]) }}>Click on the button and speak the words into the microphone.<br></br>
                     Train your pronunciation skills.</p>
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
                     Words can be drag and drop. Select tooltips in the top menu.</p>
               </div>);
         break;
      case "sprint":
         text = ( <div>
                     <h1 style={{color : (colors[gameId]) }}>Sprint</h1>
                     <p style={{color : (colorsParagr[gameId]) }}>Choose the right answer as fast as you can. <br></br>
                     Guess the right translation for the english word</p>
               </div>);
         break;
      case "audiocall":
         text = ( <div>
                     <h1 style={{color : (colors[gameId]) }}>AudioCall</h1>
                     <p style={{color : (colorsParagr[gameId]) }}>You hear the word and see 5 options for translating it.  <br></br>
                     Choose the correct one for the spoken word.</p>
               </div>);
         break;
      case "hangman":
         text = ( <div>
                     <h1 style={{color : (colors[gameId]) }}>Hangman</h1>
                     <p style={{color : (colorsParagr[gameId]) }}>This cheerful game tests your skill of understanding of the definition of the word. 
                           <br></br>It also improves your mercy.</p>
               </div>);
         break;  
      default:
         break;
   }
    
    

   return (
       <div className="start-modal-game" 
            style={ {backgroundImage : sectionStyle,
                     display: !startModal? 'none' : 'block'} }>
          <div className="darken">
             <div className="title">
                 {text}
                 <Button className="start-btn"
                         onClick={() => {
                            setStartModal(false)
                            startTheTimer ? startTheTimer() : null;
                         }}>Start</Button>
             </div>
          </div>
       </div>
   )
 }