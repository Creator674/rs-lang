import React, { useState } from 'react';  
import './audiocall.less';


export function Audiocall (props) {

	const state = { 

    };

    function shuffledArray(length){
      const arr = Array.from({ length: length }, (_v, i=0) => i);
      for (let i = arr.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }

    const words = ['Pyatachok', 'where', 'is', 'my fucking', 'gun?'];
    

   function createCards() {
      const array = [];
      for (let i = 0; i < 5; i+=1) {
         const card = (
            <div>
               <span className="number">{i}</span>
               <div className="word">
                  {words[i]}
               </div>
            </div>
         );
         array.push(card);                   
      }
      return array;
   }
   

   return (
      <div className="wrapper">
         <div className="darken">
            <div className="icon">
               <img src="./images/audiocall/play.png" alt="pic" 
                     width="70"
                     onClick={()=> console.log("clicked")}/>
            </div>
            <div className="points">
               <span>POINTS:</span> 100500
            </div>
            <div className="cards">
                {createCards()}       
            </div>
            <div className="button">
               <button className="btn">I don't know</button>
            </div>
        </div>
      </div>
   )
} 