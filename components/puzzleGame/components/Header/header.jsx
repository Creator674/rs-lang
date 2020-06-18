import React, { useState } from 'react';
import {Rating} from '../Rating/rating';
import './header.less';
 

export function Header(props) {

  


   return (
     <div className="header">

        <div className="header_column">
            <span className="header_title">Check Level</span>
            <Rating />
        </div>

       <div className="column">
           <span>Page</span>
           <select className="select" name="" id="selectPage">
               <option>60</option>
           </select>
       </div>
       
       <div class="column row">
           <button title="Prononsation-icon" className="prononsation clicked">pron</button>
           <button title="Translate the phrase" className="translation clicked">trans</button>
           <button title="Show the image" className="picture">pic</button>
           <button title="Auto-prononsation" className="sentense-pron clicked activated">auto-pron</button>
        </div> 
     </div>
   );
} 