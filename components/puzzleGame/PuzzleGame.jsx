import React, { useState } from 'react'; 
import {Header} from './components/header';
import {Gameboard} from './components/gameboard';
import {Footer} from './components/footer'; 
import './puzzle.less';


export function PuzzleGame (props) {
 
   return (
      <div className="wrapper">
         <Header {...props}/> 
         <Gameboard {...props}/> 
         <Footer {...props} /> 
      </div>
   )
} 
