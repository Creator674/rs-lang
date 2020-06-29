import React, { useState, useEffect } from 'react';
import './cardShow.less'

export const CardShow = () => {

  const [listening, setListening] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [gameStart, setGameStart] = useState(false);

  const [word, setWord] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [translation, setTranslation] = useState('');
  const [pronouncedWord, setPronouncedWord] = useState('');


   if (typeof window !== 'undefined') {
     const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
     const recognition = new SpeechRecognition();
     recognition.interimResults = false;
     recognition.maxAlternatives = 10;
     recognition.lang = "en-EN";
     recognition.continuous = false;
   }

  const toggleListen = () => {
    setListening(!listening);
  };

  const checkTheAnswer = (word) => {
    const spokedWord = word.toLowerCase();
    console.log(spokedWord)
  };

  const startGAME = () => {
    // e.preventDefault();
    if (listening) {
      recognition.start();
      setGameStart(true);
      recognition.onresult = (e) => {
        const transcriptions = Array.from(e.results)
          .map((res) => res[0])
          .map((result) => result.transcript)
          .join('');
        setPronouncedWord(transcriptions);
        console.log(transcriptions);
        if (e.results[0].isFinal) {
          checkTheAnswer(transcriptions);
        }
      }
      recognition.addEventListener('end', recognition.start);
      recognition.onspeechend = () => {
        recognition.stop()
      };
   }
  };

  const restartHandleClick = (event) => {
    event.preventDefault();
    setGameStart(true);
    recognition = '';
    recognition = new SpeechRecognition();
    recognition.start();
  };

  const showResultWindow = (event) => {
    event.preventDefault()
    setShowResults(true);
  };

  return (
    <div className='column'>
        <div className='picture'>
          <img src={imageSrc ? imageSrc : "./images/speakit/start.png"} alt="pic" />
        </div>

        <p className={gameStart ? 'translation' : 'translation play'}>
          {/* {getTranslation(word)} */}
        </p>

        <input
          type='text'
          className={listening ? 'input play' : 'input '}
          readOnly={true}
          defaultValue={pronouncedWord}
        />

        <div className='btns-container'>
          <button className={gameStart ? 'btn speak' : 'btn speak speakPls'} 
                  onClick={() => toggleListen()}>
            Speak please
          </button>

          <button className='btn restart' 
                  onClick={() => restartHandleClick()}>
            Restart
          </button>
          <button className='btn results' 
                  onClick={() => showResultWindow()}>
            Results
          </button>
        </div>
      </div>
    )
}
