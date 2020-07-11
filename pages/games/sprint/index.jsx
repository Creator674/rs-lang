import React, { useState } from 'react'; 
import { HeaderSprint } from '../../../components/games/headerSprint';
import { Gamecard } from '../../../components/games/gamecard';
import { GameStartModalWindow} from '../../../components/GameStartModalWindow';
import { StatisticGames } from '../../../components/statisticGames'
import './index.less';

const Sprint = (props) => {

   const [startTimer, setStartTimer] = useState(false);
   const [allGuessed, setAllGuessed] = useState([])
   const [allnotGuessed, setallnotGuessed] = useState([])
   const [showResults, setShowResults] = useState(false)

   const startTheTimer = () =>{
			setStartTimer(true);
	};
	const stopTimer = () => {
			setShowResults(true);
			setStartTimer(false);
   };
   const addToArrayOfAnswers = (answer, translate) => {
      const word = {}
      word.word = answer 
      word.translate = translate
      setAllGuessed((guessed) => {
         if(guessed){
            if (guessed.some((el) => el.word !== answer)) {
              return [...guessed, word]
            }
         }
       })
   };
   
   return (
      <div className="sprint-wrapper">
         <GameStartModalWindow gameId={5} nameOfGame={'sprint'}
                               startTheTimer={startTheTimer}/>
         {showResults && <StatisticGames allGuessed={allGuessed} allnotGuessed={allnotGuessed} />}

         <HeaderSprint startTimer={startTimer} stopTimer={stopTimer}/>
         <Gamecard addToArrayOfAnswers={addToArrayOfAnswers} stopTimer={stopTimer}/>
      </div>
   )
};

export default Sprint;