import React, { useState } from 'react';
import './footerPuzzle.less';
  

  export const FooterPuzzle = ({readyToCheck, result, checktheAnswer, goToNext, clickOnNext, clickIdontKnow}) => {

     return (
        <div className="puzzle-footer">
          <button title="I DON't KNOW!!!" 
                  className={`idontKnow ${readyToCheck ? "dismissed" : ""}`}
                  onClick={() => clickIdontKnow() }
                   >I don't know</button>

          <button className={`check_answer ${readyToCheck ? "" : "dismissed"}`}
                  onClick={() => checktheAnswer(result)} >Check</button>

          <button className={`continue ${goToNext ? "" : "dismissed"}`}
                  onClick={() => clickOnNext() }>Continue</button> 

          <button className={`newGame dismissed`}
                  onClick={() => clickOnNext() }>Continue </button> 
          
       </div>
     );
} 