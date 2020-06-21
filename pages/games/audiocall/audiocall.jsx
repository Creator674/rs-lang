import React, { useState } from 'react'; 
import {Header} from './components/header';
import {Gameboard} from './components/gameboard';
import {Footer} from './components/footer'; 
import './audiocall.less';


export function Audiocall (props) {

	const state = { 

    };


   return (
      <div className="wrapper">
         <Header {...props}/>

         <Gameboard {...props}/>

         <Footer {...props} />

      </div>
   )
} 