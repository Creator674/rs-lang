import React, { useState } from 'react'
import {Card} from './card/card'
import {Aside} from './aside/aside'
import './mainpage.less'


export const MainPageWithCard = (props) => {
 
   return (
       <div className="mainpage">
         <Aside />

         <Card />
         
         <div className="hints">
             MENU
         </div>

       </div>
   )
 }