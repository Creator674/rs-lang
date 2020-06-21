import React, { useState } from 'react'; 
import {Header} from './components/header';
import {Gamecard} from './components/gamecard';
import './sprint.less';


export function SprintGame (props) {

   return (
      <div className="sprint">
         <Header {...props}/>
         <Gamecard {...props}/>
      </div>
   )
} 