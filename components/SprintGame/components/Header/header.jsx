import React, { useState } from 'react'; 
import './header.less';
 

export function Header(props) {

   const state = {  
      count: 0,
      audioSrc: "...",
    }
 
    const [counter, setCounter] = React.useState(500);
    React.useEffect(() => {
      counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter]);

   return (
     <div className="sprint-header">
        <div className="sprint_column">
           <h1 className="sprint_title">POINTS</h1>
           <p> { state.count } </p>
        </div>

        <div className="sprint_column">
            <h1 className="sprint_title">TIMER</h1>
            {counter}
        </div> 
     </div>
   );
} 