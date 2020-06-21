import React, { useState } from 'react'; 
import './header.less';
 

export function Header(props) {

   const state = {  
      count: 80,
      audioSrc: "...",
    }

   //   --------------------------------timer
    const [counter, setCounter] = React.useState(130);
    React.useEffect(() => {
       counter > 0 && setTimeout(() => setCounter(counter - 1), 1000); 
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
        <div className="sprint_column">
           <h1 className="sprint_title">POINTS</h1>
           <p> { state.count } </p>  
        </div>

        <div className="sprint_column">
            <h1 className="sprint_title">TIMER</h1>
            {time} 
        </div> 
     </div>
   );
} 