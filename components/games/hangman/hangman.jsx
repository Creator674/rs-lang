import React, { useState } from 'react';  
import './index.less';
import { randomWord } from './components/words'

import step0 from '../../../public/images/hangman/0.jpg';
import step1 from '../../../public/images/hangman/1.jpg';
import step2 from '../../../public/images/hangman/2.jpg';
import step3 from '../../../public/images/hangman/3.jpg';
import step4 from '../../../public/images/hangman/4.jpg';
import step5 from '../../../public/images/hangman/5.jpg';
import step6 from '../../../public/images/hangman/6.jpg';

export class Hangman extends React.Component {
 
   static defaultProps = {
      maxWrong: 6,
      images: [step0, step1, step2, step3, step4, step5, step6]
   };

   constructor(props){
      super(props);
      this.state = {
         mistake: 0,
         guessed: new Set([]),
         answer: randomWord()[0],
      };
   }

   handleClick = (e) => {
      let letter = e.target.value;
      this.setState(state => ({
         guessed: state.guessed.add(letter),
         mistake: state.mistake + (state.answer.includes(letter) ? 0 : 1)
      }))
   }

   guessedWord(){
      return this.state.answer.split("")
         .map( letter => (
            this.state.guessed.has(letter) ? <span>{letter}</span> : <span> </span>
         ));
   }

   generateBtns(){
      return 'abcdefghijklmnopqrstuvwxyz'.split("").map(letter => (
         <button key={letter} 
                 value={letter}
                 onClick={this.handleClick}
                 disabled={this.state.guessed.has(letter)}
                 >{letter}</button>
      ));
   }

   resetButton = () => {
      this.setState({
         mistake: 0,
         guessed: new Set([]),
         answer: randomWord()[0]
      });
   }


   render(){
      const gameOver = this.state.mistake >= this.props.maxWrong;
      let buttons = this.generateBtns();
      let yourAnswer = "";
      [...this.guessedWord()].forEach(el => {
         yourAnswer += el.props.children;
      });
      const isWinner = yourAnswer === this.state.answer;

      if(isWinner){
         buttons = <span className="win">You win! Congrats!</span>
      }
      if(gameOver){
         buttons = <span className="lose">You fucked up! Try again</span>
      }

      return (
         <div className="hangman">
            <h1>Hangman</h1>

            <div className="row">
               <div className="left">
                  <p className="guess">Guess the Word or Die!</p>
                  <p>Wrong guesses: <span>{this.state.mistake}</span> of {this.props.maxWrong}</p>
                  <div className="answer">
                     {!gameOver ? this.guessedWord() : <p>That was the word <b>'{this.state.answer}'</b></p>}
                  </div>
               </div>

               <div className="right">
                  <img src={this.props.images[this.state.mistake]} alt="hang"/>
               </div>
            </div>

            <div className="letters">
               <div className="btns">
                  {buttons}
               </div>
               <button className="reset" onClick={this.resetButton}>Reset</button>
            </div>

         </div>
      )
   }
} 
