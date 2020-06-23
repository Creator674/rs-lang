import React, { useState } from 'react';  
import { getWords } from '../../../lib/crud/auth'
import './audiocall.less';



export class Audiocall extends React.Component {
 
   constructor(props){
      super(props);
      this.state = {
         words: [],
         count: 0,
      };
      this.drawWords = this.drawWords.bind(this)
   }

   componentDidMount() {
      getWords(1,1)
      .then((response) => {
          this.successShow(response);
      })
      .catch((error) => {
          this.successShow(error);
      });
  }

  successShow(response) {
      console.log(response.data);
      this.setState( state => ({
         words: response.data.map( el => [el.audio, el.word])
      }));
   }

   drawWords () {
     return this.state.words.map((el, i) => {
         return (
            <div className="word-box">
               <span className="number">{i + 1}</span>
               <div key={i} className="word">
                  {el[1]}
               </div>
            </div>
         );
      });
   }
    
   render(){
      return (
         <div className="wrapper">
            <div className="darken">
               <div className="icon">
                  <img src="/images/audiocall/play.png" alt="pic" 
                        width="70"
                        onClick={()=> console.log("clicked")}/>
               </div>
               <div className="points">
                  <span>POINTS:</span> 100500
               </div>
               <div className="cards">
                  { this.drawWords() }      
               </div>
               <div className="button">
                  <button className="btn">I don't know</button>
               </div>
         </div>
         </div>
      )
   }
} 
