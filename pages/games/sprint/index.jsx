import React from 'react'; 
import { HeaderSprint } from '../../../components/games/headerSprint';
import { Gamecard } from '../../../components/games/gamecard';
import { GameStartModalWindow} from '../../../components/GameStartModalWindow';
import './index.less';

const Sprint = (props) => {
   return (
      <div className="sprint-wrapper">
         <GameStartModalWindow gameId={5} nameOfGame={'sprint'}/>
         <HeaderSprint {...props}/>
         <Gamecard {...props}/>
      </div>
   )
};

export default Sprint;