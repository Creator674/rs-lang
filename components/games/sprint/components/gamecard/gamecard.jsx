import React, { useState } from 'react';
import './gamecard.less';
import { shuffledArray } from '../../../../../lib/helpers/shufflefunc'
import { getWords } from '../../../../../lib/crud/auth';


export class Gamecard extends React.Component {

   constructor(props){
      super(props);
      this.state = {
         allwords: [],
         words: [],
         translate: [],
         count: 0,
         shufeledArray: shuffledArray(),

         currentWord: '',
         currentTranslation: '',
      };
      this.isTrue = this.isTrue.bind(this);

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
         words: response.data.map( el => el.word),
         translate: response.data.map( el => el.wordTranslate),
         allwords: response.data.map( el => Object.assign({}, el.wordTranslate, el.word) )
      }));
   }

   isTrue(){
      console.log(this.state.allwords);
      if(this.state.currentWord === this.state.currentTranslation){

      }
   }

 render(){
   return (
      <div className="wrapper-game">
         <div className="card">
            <div className="card_title">
               <img src="/images/sprint/ok.png" alt="pic" width="30"></img>
               <p>+ 80 points</p>
            </div>
            <img src="/images/sprint/snail.png" alt="pic" width="70"></img>
            <div className="card_info">
               <p className="card_word">fuck off</p>
               <p className="card_trans">хорошего дня</p>
            </div>
            <div className="border"></div>
            <div className="game-bnts">
               <button className="true"
                       onClick={this.isTrue} >true</button>
               <button className="false"
                       onClick={()=> console.log("clicked")} >false</button>
            </div>
         </div>

         <audio src="" className="audio_word"></audio>
      </div>
   );
 }
}  