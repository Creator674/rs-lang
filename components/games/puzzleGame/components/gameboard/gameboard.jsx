import React, { useState } from 'react'; 
import './gameboard.less';


 function shuffledArray(length){
      const arr = Array.from({ length: length }, (_v, i=0) => i);
      for (let i = arr.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
}



// function draggAfter(container, x){
//    const dragEls = [...container.querySelectorAll(".draggyWord:not(.dragging)")];
//    return dragEls.reduce((closest, child)=>{
//        const boundingBox = child.getBoundingClientRect();
//        const offset = x - boundingBox.left - boundingBox.width / 2;
//        if(offset<0 && offset>closest.offset){
//            return { offset, element: child};
//        } 
//        return closest;
//    }, {offset: Number.NEGATIVE_INFINITY }).element;  
//    // drag to right - negative number, drag to left - positive
// }

// function isBtnAllowed() {
//    const isBoardEmpty = document.querySelector(".word-container:not(.input-res)");
//    if(isBoardEmpty){
//       if(!isBoardEmpty.innerHTML){
//          checkAnswer.classList.remove("dismissed");
//       }
//    }
// };

// function doDragging(phrasecount, ind, string, audio){
//    index = ind;
//    if(ind === 0){
//       count = string.length; 
//    } else{
//       count = phrasecount;
//    }
   
//    document.querySelectorAll(".draggyWord").forEach(word => {
//       word.addEventListener("dragstart", ()=>{
//          word.classList.add("dragging");
//       });
//       word.addEventListener("dragend", ()=>{
//          word.classList.remove("dragging");
//       });
//       word.addEventListener("click", ()=>{ 
//          document.querySelector(".input-res").appendChild(word);
//          isBtnAllowed();
//       });
// });  
   



export function Gameboard (props) {
    const state = { 
      count: 1,
      isCorrect: false,
    };
 

    function getPicture(level) {
      const imagePerPage = [45, 41, 40, 29, 29, 25];
      const lev = Number(level) + 1;
      let random =  Math.floor(Math.random() * imagePerPage[+level] ); 
      if(random<10){
        random = `0${random}`;
      }
      const url = `https://raw.githubusercontent.com/davinchick/rslang_data_paintings/master/level${lev}/${lev}_${random}.jpg`;
      // return url;
       
      document.querySelector(".guessed_phrases_board").style.backgroundImage = `url(${url})`;
    }


    function createPhrase(string){
       const str = string.split(" ");
       const shuffledArr = shuffledArray(str.length);
       const phraseArray = [];

       for (let j = 0, l = shuffledArr.length; j < l; j+=1) {
          const word = 
            <span draggable="true" className="draggyWord">
              {str[shuffledArr[j]]}
            </ span> ;
         
          phraseArray.push(word);
        }
        return phraseArray;
    }

    function audioPlay(src){
      if(props.pronounBtnClicked){
        const audio = document.querySelector("audio");
        audio.src = src;
        audio.play();
      }
    }

  //  const phrase = props.phrases[state.count].text.replace(/<\/?b>/g, "");

   function drawAnswer(){
      const answer = 
          <div className="word-container input-res">
<span>  ----- Drop here </span>
          </div>;
      return answer;
   }




   return (
      <div className="wrapper-game">
        <div className="phrase">
             <span >
                <img className={`audio-transl ${props.pronosBtnClicked ? "hidden" : ""}`} 
                  src="/images/puzzle/play.png" width="30" alt="audio"
                  // onClick={audioPlay(props.phrases[state.count].audio)}
                   />
             </span> 

             <p className={`translation-text ${props.translBtnClicked ? "visibilityHid" : ""}`}>
                {/* {props.phrases[state.count].sentenceTransl */}
                перевод
             </p> 
        </div>

        <div className="gameboard-cont">
            <div className="guessed_phrases_board">
              <div className="guessed">
                {/* {backgroundImage = picture!!!!} */}
                <span>угаданные слова</span>
              </div>
            </div>

            <div className="gameboard">
              
              <div className="word-container">
                 {/* { createPhrase(phrase)} */}
                 <span>Drag from here ----- ></span>
              </div>  
              <div className="answ-wrapper">
                  {drawAnswer()} 
              </div> 
            </div>
        </div>


        <audio src="" className="audio_word"></audio>
      </div>
   )
} 