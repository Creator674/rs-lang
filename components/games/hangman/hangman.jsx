import React, { useState, useEffect } from 'react';  
import { makeStyles } from '@material-ui/core/styles'
import './index.less';
import { allWords } from './words'
import { shuffledArray} from '../../../lib/helpers/shufflefunc';

import step0 from '../../../public/images/hangman/0.jpg';
import step1 from '../../../public/images/hangman/1.jpg';
import step2 from '../../../public/images/hangman/2.jpg';
import step3 from '../../../public/images/hangman/3.jpg';
import step4 from '../../../public/images/hangman/4.jpg';
import step5 from '../../../public/images/hangman/5.jpg';
import step6 from '../../../public/images/hangman/6.jpg';

const useStyles = makeStyles({
   root: {
     backgroundImage: 'url(/images/hangman/fon.jpg)',
   },
   title: {
     fontSize: 14,
   }
 })

export const Hangman = (props) => { 
      const maxWrong = 6;
      const shuffled = shuffledArray(20);
      const images = [step0, step1, step2, step3, step4, step5, step6];
      const classes = useStyles();

      const [win, setWin]= useState(false);
      const [next, setNext]= useState(false);
      const [count, setCount]= useState(0);
      const [mistake, setMistake]= useState(0);
      const [clicks, setClicks]= useState(0);
      const [guessed, setGuessed]= useState(new Set([]));

      const [answer, setAnswer]= useState('');
      const [translate, setTranslate]= useState('');
      const [example, setExample]= useState('');

      const gameOver = mistake >= maxWrong;

      useEffect(() => {
         if(next){
            setCount(count + 1);
            setNext(false);
         }
         const values = allWords().then((data) => {
            console.log(data);
            setAnswer(data[0][shuffled[count]]);
            setTranslate(data[1][shuffled[count]]);
            setExample(data[2][shuffled[count]]);
         });
      },[next]);

      const handleClick = (value) => {
         setClicks(clicks + 1);
         if(answer.includes(value)){
            setGuessed(guessed.add(value));
         } else{
            setMistake(mistake + 1);
         }
      };

      const guessedWord = () => {
         return answer.split("")
            .map( (letter, i) => (
               guessed.has(letter) ? <span key={i}>{letter}</span> : <span> </span>
            ));
      };

      const generateBtns = () => {
         return 'abcdefghijklmnopqrstuvwxyz'.split("").map(letter => (
            <button key={letter} 
                    value={letter}
                    onClick={() => handleClick(letter)}
                    disabled={guessed.has(letter)}
                    > {letter}</button>
         ));
      };

      const resetButton = () => {
         setMistake(0);
         setGuessed(new Set([]));
         setAnswer('');
         setWin(false);
         setNext(true);
      };

      let yourAnswer = "";
      let areYouRight = answer === yourAnswer;

      useEffect( () => {
         [...guessedWord()].forEach(el => {
            yourAnswer += el.props.children;
         });
         if(answer !== ''){
            areYouRight = answer === yourAnswer;
            if(areYouRight){
               setWin(true);
            }
         }
      }, [clicks]);

      return (
            <div className={`${classes.root} hangman`}>
               <h1>Guess the Word or Die!</h1>

               <div className="row">
                  <div className="left">
                     <p className="guess" dangerouslySetInnerHTML={{__html: example}}></p>
                     <p>Wrong guesses: <span>{mistake}</span> of {maxWrong}</p>
                     <div className="answer">
                        {!gameOver ? guessedWord() :
                           <p>That was the word <b>'{answer}'</b> - means '{translate}'</p>
                        }
                     </div>
                  </div>

                  <div className="right">
                     <img src={images[mistake]} alt="hang"/>
                  </div>
               </div>

               <div className="letters">
                  { win ? 
                        <p className="win">You win! Congrats!</p> : ''}
                  <div className="btns" id='btns'>
                     { gameOver ?
                        <p className="lose">You fucked up! Try again</p> : generateBtns()
                     }
                  </div>
                  <button className="reset" onClick={resetButton}>Reset</button>
               </div>

            </div>
      );
} 