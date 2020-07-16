import React, { useState, useEffect } from 'react';
import './gamecard.less';
import { getWordsAndTranslation } from '../../../lib/crud/auth';
import { shuffledArray, shuffledRandomArray } from '../../../lib/helpers/shufflefunc';

 
export const Gamecard = ({addToArrayOfAnswers, setIsCorrect, stopTimer}) => { 
      let  shufeledArray1 = shuffledArray(20);
      let  shufeledArray2 = shuffledRandomArray(20);
 
      const [countGuessed, setcountGuessed] = useState(0); 
      const [data, setDate] = useState([]);
      const [count, setCount] = useState(0);
      const [points, setPoints] = useState(0);
      const [round, setRound] = useState(0);  

      const [words, setWords] = useState([]);
      const [translation, setTranslation] = useState([]);

      const [currentTranslation, setCurrentTranslation] = useState('');
      const [currentWord, setCurrentWord] = useState('');

      useEffect(() => {
         getWordsAndTranslation(1,1)
          .then( (data) => {
             setDate(data);
             setWords(data.map((el) => el[0]));
             setTranslation(data.map((el) => el[1]));
             setCurrentWord(data[shufeledArray1[count]][0]);
             setCurrentTranslation(data[shufeledArray2[count]][1]);
             addToArrayOfAnswers(data)
             return data;
           })
           .catch((error) => error);
      }, []);

      const drawWords = () => {  
         return (
               <div className="card_info">
                  <p className="card_word"> 
                     {currentWord} </p>
                  <p className="card_trans">
                     {currentTranslation} </p>
               </div>
            )
      }
 
      const handleClick = (bool) => {  
         const indTrans = translation.indexOf(currentTranslation);
         const indWord = words.indexOf(currentWord);
         const answer = words.indexOf(currentWord) === indTrans; 
         if(bool === answer){
            setPoints(points + 10);
            setcountGuessed(countGuessed + 1);
            setIsCorrect(currentWord, true);
            document.getElementById('yes').play();
         } else {
            setcountGuessed(0);
            setIsCorrect(currentWord, false);
            document.getElementById('no').play();
         }
         setCount(count + 1); 

         if(countGuessed && countGuessed % 5 === 0){
            document.getElementById('wow').play();
            document.getElementById('points').classList.add('wow');
            setTimeout(() => {
               document.getElementById('points').classList.remove('wow');
            }, 1100);
            setPoints(points + 50);
         }  

          if(count + 1 > 19){
            setCount(0);
            shufeledArray1 = shuffledArray(20);
            shufeledArray2 = shuffledRandomArray(20);
            setRound(round + 1); 
          }
          setCurrentWord(words[shufeledArray1[count]]);
          setCurrentTranslation(translation[shufeledArray2[count]]);

          if(round === 3){
            stopTimer();
          }
      }
 
      return (
         <div className="wrapper-game">
            <div className="card">
               <div className="card_title">
                  <img src="../images/sprint/ok.png" alt="pic" width="30"></img>
                  <p id="points">+ {points} points</p>
               </div>
               <img src="../images/sprint/snail.png" alt="pic" width="70"></img>
                 { drawWords() }
               <div className="border"></div>
               <div className="game-bnts">
                  <button className="true"
                          onClick={() => handleClick(true)} >true</button>
                  <button className="false"
                          onClick={() => handleClick(false)} >false</button>
               </div> 
            </div>
 
            <audio src='../audio/kok.mp3' className="audio_word" id="yes"></audio>
            <audio src='../audio/piu.mp3' className="audio_word" id="no"></audio>
            <audio src='../audio/wow.mp3' className="audio_word" id="wow"></audio>
         </div>
      ); 
}  