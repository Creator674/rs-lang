import React, { useState } from 'react';
import './card.less';


export default class Card extends React.Component {
 
   constructor(props){
      super(props),
      this.state = {
         status: false,
         word: props.word,
         translation: props.wordTranslate,
         transcription: props.transcription,
         audioSrc: props.sound,
         isguessed: false,
       }
    };

    componentDidMount = () => {
      console.log(this.state.audioSrc)
    }

    audioPlay = () => {
      this.audio = new Audio(this.state.audioSrc);
      this.audio.play();
   };


   render(){
     return (
     		<div className={this.state.isGuessed ? "card true" : "card" }
                >
     		    <div className="icon" onClick={this.audioPlay}>
                 <img src="./images/speakit/play.png" />
               </div>

     		    <div className="text">
                 <p>  {this.state.word} </p>
                 <p>  {this.state.transcription} </p>
               </div>
     		</div>
     );
  }
} 