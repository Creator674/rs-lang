import React, { useState, useEffect } from 'react';  
import { getWordsTranslationAndAudio, getImg } from '../../../lib/crud/auth'
import { shuffledArray, shuffledRandomArray } from '../../../lib/helpers/shufflefunc';
import './audiocall.less';



export const Audiocall = (props) => {
  
   let  shufeledArray1 = shuffledArray(20);
   let  shufeledArray2 = shuffledRandomArray(20);
let isGameEnd = false;

   const [countGuessed, setcountGuessed] = useState(0); 
   const [data, setDate] = useState([]);
   const [count, setCount] = useState(0);
   const [points, setPoints] = useState(0);
   const [round, setRound] = useState(0);  

   const [words, setWords] = useState();
   const [translation, setTranslation] = useState();
   const [image, setImage] = useState(); 

   const [currentTranslation, setCurrentTranslation] = useState();
   const [currentWord, setCurrentWord] = useState();

   useEffect(() => {
      getWordsTranslationAndAudio(1,1)
       .then( (data) => {
         console.log( data ) 
          setDate(data);

          setImage(data.map( (el) => getImg(el[3]).then(img => img)));

          setWords(data.map((el) => el[0]));
          setTranslation(data.map((el) => el[1]));
          setCurrentWord(data[shufeledArray1[count]][0]);
          setCurrentTranslation(data[shufeledArray2[count]][1]);
          
          return data;
        })
        .catch((error) => error);
   }, []);

   console.log( image );

   const handleClick = (bool) => {  

      const answer = words.indexOf(currentWord) === translation.indexOf(currentTranslation); 
      if(bool === answer){
         console.log('yes, it"s" true!!');
         setPoints(points + 10);
         setcountGuessed(countGuessed + 1);
         document.getElementById('yes').play();
      } else {
         setcountGuessed(0);
         console.log('no, it"s false!!');
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
         isGameEnd = true;
         console.log("it's the end of game!");
         //   ToDo: the end of game
       }

       console.log(currentWord, currentTranslation)

   }

   const drawWords = () => {
         return (
            <div className="word-box">
               <span className="number">{''}</span>
               <div key={''} className="word">
                  {''}
               </div>
            </div>
         );
   }
    
   
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
                  { drawWords() }      
               </div>
               <div className="button">
                  <button className="btn">I don't know</button>
               </div>
         </div>

            <audio src='/audio/kok.mp3' className="audio_word" id="yes"></audio>
            <audio src='/audio/wow.mp3' className="audio_word" id="wow"></audio>
         </div>
      )
   
} 
