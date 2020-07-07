import React, { useState } from 'react'; 
import { HeaderSprint } from '../../../components/games/headerSprint';
import { Gamecard } from '../../../components/games/gamecard';
import { GameStartModalWindow} from '../../../components/GameStartModalWindow';
import './index.less';

const Sprint = (props) => {

   const [startTimer, setStartTimer] = useState(false);
   const [showResults, setShowResults] = useState(false);
   
   const startTheTimer = () =>{
			setStartTimer(true);
	};
	const stopTimer = () => {
			setShowResults(true);
			setStartTimer(false);
   }
   
   return (
      <div className="sprint-wrapper">
         <GameStartModalWindow gameId={5} nameOfGame={'sprint'}
                               startTheTimer={startTheTimer}/>
         <HeaderSprint startTimer={startTimer} stopTimer={stopTimer}/>
         <Gamecard stopTimer={stopTimer}/>
      </div>
   )
};

export default Sprint;