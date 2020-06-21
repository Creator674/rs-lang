import React, { useState } from 'react';
import './card.less';


export default class Card extends React.Component {
 
   constructor(props){
      super(props),
 
      this.state = {
         status: false,
         currentWord: "...",
 
         isPlayedAudio: false,
         word: "...",
         imageSrc: "...",
         translation: "...",
         transcription: "...",
         isguessed: false,
       }
 
      //  this.output = this.output.bind(this)
    };

    audioPlay () {
      this.setState({
         isPlayedAudio: true,
      });
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