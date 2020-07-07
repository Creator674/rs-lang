import React, { useState, useEffect } from 'react'; 
import './headerSprint.less';
 

export function HeaderSprint(props) {

   const {startTimer, stopTimer} = props;
   //   --------------------------------timer
    const [counter, setCounter] = useState(0);
    
    useEffect(() => {
    if(startTimer){
      setCounter(130);
    } else {
      setCounter(0);
    }
   }, [startTimer]);

    useEffect(() => {
       counter > 0 && setTimeout(() => setCounter(counter - 1), 1000); 
       if(counter === 0){
         stopTimer();
      }
    }, [counter]);

   const time = ( 
         <div id="countdown">
           <div id="countdown-number">
              {counter}
           </div>
           <svg>
              <circle r="32" cx="34" cy="34" 
                      stroke={counter > 60? "#8BC34A" : counter > 30? "#ff9800": "#fa3e3a"}
              ></circle>
           </svg>
        </div>
   ); 

   return (
     <div className="sprint-header">
            <h1 className="sprint_title">Sprint</h1>
            {time} 
     </div>
   );
} 