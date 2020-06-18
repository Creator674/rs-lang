import React, { useState } from 'react'; 
import './footer.less';


export function Footer(props) {

   

   return (
      <div className="row footer">
        <button title="I DON't KNOW!!!" className="idontKnow dismissed"> </button>
        <button className="check_answer dismissed">Check</button>
        <button className="continue dismissed">Continue</button> 
        <button className="newGame dismissed">Continue</button> 
     </div>
   )
} 