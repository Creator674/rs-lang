import React, { useState, useEffect } from 'react';
import './card.less';


export const Card = ({guessed, props}) => {
 
    const [word, setWord] = useState();
    const [audioSrc, setAudioSrc] = useState();
    const [translation, setTranslation] = useState();
    const [transcription, setTranscription] = useState(); 
    // console.log(props)

    useEffect(() => {
      // console.log(props)
      setWord(props.word);
      setTranscription(props.transcription);
      setAudioSrc(props.sound);
      setTranslation(props.translation);
    }, [])

    const audioPlay = () => {
      const audio = new Audio();
      audio.src = audioSrc;
      audio.play();
    };


     return (
     		<div className={guessed === word ? "card true" : "card"}>
     		    <div className="icon" onClick={() => audioPlay()}>
                 <img src="./images/speakit/play.png" />
               </div>

     		    <div className="text">
                 <p>  {word} </p>
                 <p>  {transcription} </p>
               </div>
     		</div>
     );
} 