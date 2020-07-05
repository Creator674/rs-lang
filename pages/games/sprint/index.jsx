import React from 'react'; 
import { HeaderSprint } from '../../../components/games/headerSprint';
import { Gamecard } from '../../../components/games/gamecard';
import './index.less';

const Sprint = (props) => {
   return (
      <div className="sprint-wrapper">
         <HeaderSprint {...props}/>
         <Gamecard {...props}/>
      </div>
   )
};

export default Sprint;