import React, { useState } from 'react';
import './gameboard.less';
  

  export class Gameboard extends React.Component {

    

   render(){ 
   return ( 
      <div className="gameboard-cont">
         <div className="guessed_phrases_board">

         </div>
         <div className="gameboard">

         </div>
   </div> 
   );
   }
} 