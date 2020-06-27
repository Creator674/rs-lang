import React, { useState, useEffect } from 'react';  
import { getWordsTranslationAndAudio, getImg, getAudio } from '../../../lib/crud/auth'
import { shuffledArray } from '../../../lib/helpers/shufflefunc';
import './audiocall.less';

export const Audiocall = (props) => {
  
   let  shufeledArray1 = shuffledArray(20);
   let  shufeledArray2 = shuffledArray(20);
let isGameEnd = false;

   const [data, setDate] = useState([]);
   const [count, setCount] = useState(0);
   const [points, setPoints] = useState(0);
   const [isGuessed, setIsGuessed] = useState(false);

   const [words, setWords] = useState();
   const [translation, setTranslation] = useState();
   const [images, setImages] = useState([]); 
   const [audio, setAudio] = useState(); 

   const [currentTranslation, setCurrentTranslation] = useState();
   const [currentWord, setCurrentWord] = useState();

   useEffect(() => {
      getWordsTranslationAndAudio(1,1)
       .then( (data) => {
         //  console.log(data);
          setDate(data);
          setWords(data.map((el) => el[0]));
          setTranslation(data.map((el) => el[1])); 
          setCurrentWord(data[shufeledArray1[count]][0]);
          setCurrentTranslation(data[shufeledArray1[count]][1]);
          
          const images = data.map( (el) => getImg(el[3]).then(img => img));
          Promise.allSettled(images).then((results) => {
             setImages(results.map((res) => res.value))
          });
          const audio = data.map( (el) => getAudio(el[2]).then(el => el));
          Promise.allSettled(audio).then((results) => {
             setAudio(results.map((res) => res.value))
          });
          return data;
        })
        .catch((error) => error);
   }, []);


   const drawWords = () => { 
console.log(images[shufeledArray1[count]]);
      const arrayOfFiveWords = [];
      arrayOfFiveWords.push(currentTranslation);
      let i = 0;
      // while (arrayOfFiveWords.length < 5) {
      //    const ind = shufeledArray2[i]; 
      //    const currentInd = shufeledArray1[count];
      //    if(i !== currentInd){
      //       arrayOfFiveWords.push(translation[ind]);
      //    }
      //    i += 1;
      // }
      arrayOfFiveWords.sort(() => Math.random() - 0.5);
         return arrayOfFiveWords.map( (el, i) => (
            <div className="word-box">
               <span className="number">{i + 1}</span>
                  <div key={i} className="word"
                              onClick={() => handleClick(el)} >
                  {el}
               </div>
            </div>
         ));
   };
console.log(images) 
console.log(audio) 

   const handleClick = (word) => {  
      if(currentTranslation === word){
         console.log('yes, it"s" true!!');
         setPoints(points + 10);
         setIsGuessed(true);
      } else {
         console.log('no, it"s false!!');
      }
      setCount(count + 1); 
      shufeledArray2 = shuffledArray(20);  // refreshing shuffled array
      if(count + 1 > 19){
         console.log('THE END OF GAME');
         isGameEnd = true;
      }

      setCurrentWord(words[shufeledArray1[count]]);
      setCurrentTranslation(translation[shufeledArray1[count]]);
      setCurrentImage(images[shufeledArray1[count]]);
      setCurrentAudio(audio[shufeledArray1[count]]);
      console.log(currentWord, currentTranslation)
   };
   
   const audioPlay = () => {
      document.getElementById('word').play();
      
   };

   const showAnswer = () => {
      console.log(currentTranslation);
      setIsGuessed(true);
      setTimeout(()=>{
         setIsGuessed(false);
      }, 1200);
   };

      return (
         <div className="wrapper">
            <div className="darken">
               <div className="icon">
                  <img src="/images/audiocall/play.png" alt="pic" 
                        width="70"
                        onClick={() => audioPlay() }
                        />
               </div>
               <div className="points">
                  <span>POINTS:</span> {points}
                  <div className="image">
                     <img src={isGuessed ? '' : '/images/audiocall/snail.png'} alt="word"></img>
                  </div>
                  <p className={`word-correct ${isGuessed ? images[shufeledArray1[count]] : 'hide'} `} >{currentWord}</p>
               </div>
               <div className="cards">
                  { drawWords() }      
               </div>
               <div className="button">
                  <button className="btn"
                          onClick={() => showAnswer()}
                          >
                  I don't know</button>
               </div>
         </div>

            {/* <audio src={audio[shufeledArray1[count]] || '/audio/wow.mp3'} id="word"></audio> */}
         </div>
      )
} 
