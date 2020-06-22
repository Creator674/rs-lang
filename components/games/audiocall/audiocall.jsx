import React, { useState } from 'react';  
import './audiocall.less';


export function Audiocall (props) {
 
    const words = ['Pyatachok', 'where', 'is', 'my fucking', 'gun?'];
    const wordsArray =  Array.from({length: 5}).fill("").map((el, i) => {
                   return (
                     <div>
                        <span className="number">{i + 1}</span>
                        <div key={i} className="word">
                           {words[i]}
                        </div>
                     </div>
                   );
                });
   return (
      <div className="wrapper">
         <div className="darken">
            <div className="icon">
               <img src="/images/audiocall/play.png" alt="pic" 
                     width="70"
                     onClick={()=> console.log("clicked")}/>
            </div>
            <div className="points">
               <span>POINTS:</span> 100500
            </div>
            <div className="cards">
                {wordsArray}      
            </div>
            <div className="button">
               <button className="btn">I don't know</button>
            </div>
        </div>
      </div>
   )
} 
