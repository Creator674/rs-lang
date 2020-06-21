import React, { useState } from 'react';
import {Rating} from '../rating/rating';
import './header.less';
 

export function Header(props) {

   const state = {
      level: "1",
      pronosBtnClicked: false,
      translBtnClicked: false,
      pictureBtnClicked: false,
      autopronBtnClicked: false,
      page: 1,
    }

    function createOptions(){
      const arrayOptions = [];
      for(let i=1; i<61; i+=1){
        const option = <option value={i}>{i}</option>;
        arrayOptions.push(option);
      }
      return arrayOptions;
    }



   return (
     <div className="header">
        <div className="header_column">
            <span className="header_title">Check Level</span>
            <Rating />
        </div>

        <div className="header_column">
           <span className="page">Page</span>

           <select className="select"    
                   id="selectPage"
                //    onChange={state.page: this.selected.value} 
                   >
            {createOptions()}
           </select>
        </div>

        <div className="header_column row">
           <button title="Prononsation-icon" 
                   className={`prononsation ${state.pronosBtnClicked? "clicked" : "" }`}> ♫</button>

           <button title="Translate the phrase" 
                   className={`translation ${state.translBtnClicked? "clicked" : "" }`}> ↔</button>

           <button title="Show the image" 
                   className={`picture ${state.pictureBtnClicked? "clicked" : "" }`}> 🎴</button>

           <button title="Auto-prononsation" 
                   className={`sentense-pron clicked ${state.autopronBtnClicked? "clicked" : ""}`}> 🔊</button>
        </div> 
     </div>
   );
} 