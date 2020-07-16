import React, { useState, useEffect, useRef } from 'react'
import './gameboardPuzzle.less'
import { shuffledArray } from '../../..//lib/helpers/shufflefunc'
import { PhraseInfo } from '../phraseInfo'


export const GameboardPuzzle = props => {
  const { pronunc, translat, picture, mistakes, showImage,
          autoPronunc, data, dontKnow, dontKnowDone, goOn, goToNext} = props;

  const [currentText, setCurrentText] = useState([]);
  const [currentTranslate, setCurrentTranslate] = useState('');
  const [currentAudio, setCurrentAudio] = useState('');

  const [shuffledArr, setShuffledArr] = useState([]);
  const [shuffledText, setShuffledText] = useState([]);
  const [ANSWERS, setANSWERS] = useState([]);
  const [guessedPhrase, setguessedPhrase] = useState([]);

  useEffect(() => {
    if(data){
      setCurrentText(data.text.split(' '));
      setCurrentTranslate(data.textTranslate);
      setCurrentAudio(data.audio);
      setShuffledArr(shuffledArray(data.text.split(' ').length));
    }
  }, [data])

  useEffect(() => {
    setShuffledText(shuffledArr.map(ind => currentText[ind]) );
  }, [shuffledArr]);

  useEffect(() => {
    if(goToNext){
      setANSWERS(ANSWERS => [...ANSWERS, currentText] );
      setguessedPhrase([]);
    }
  }, [goToNext]);

  useEffect(() => {
    if(guessedPhrase.length && guessedPhrase.length ===currentText.length ){
      goOn(guessedPhrase, currentText);
    }
  }, [guessedPhrase]);

  useEffect(() => {
    if(dontKnow){
      setShuffledText([])
      setguessedPhrase(currentText);
      dontKnowDone();
    }
  }, [dontKnow]);

  const drawGuessedWords = () => {
      return ANSWERS.map(phrase => (
        <div className='guessed'> {phrase.map( (el, ind) => (
              <span className='guessed-word' key={el + ind}>{el}</span>
            ))}
        </div>)
      );
  };

  const handleClickWord =(e, word) => {
    setguessedPhrase(guessedPhrase => [...guessedPhrase, word]);
    setShuffledText((shuffledText) => {
      const clickedInd = shuffledText.indexOf(word);
      return shuffledText.slice(0, clickedInd ).concat(shuffledText.slice(clickedInd + 1 ))
    });
  }
  const handleClickAnswer =(e, word) => {
    setShuffledText(text => [...text, word]);
    setguessedPhrase((guessedPhrase) => {
      const clickedInd = guessedPhrase.indexOf(word);
      return guessedPhrase.slice(0, clickedInd ).concat(guessedPhrase.slice(clickedInd + 1 ))
    });
  }

  return (
      <div className='gameboard'>
        <PhraseInfo currentTranslate={currentTranslate} currentAudio={currentAudio}
                  pronunc={pronunc} autoPronunc={autoPronunc} translat={translat}/>

        <div className='gameboard-container'>
           <div className='guessed_phrases_board'
               style={{ backgroundImage: picture }}>
              { drawGuessedWords() }
           </div>

           <div className='dragging-words-container'>
              {
                  <div className='word-container'
                      >
                    {
                      shuffledText.map((word, ind) => (
                        <span className='draggyWord'
                              key={'draggy'+ind}
                              id={`card-${ind}`}
                              onClick={(e) => handleClickWord(e, word) }>
                                {word}
                        </span>))
                    }
                  </div>
                }
            </div>

            <div className='answer-wrapper'>
                      <div className="word-container input-results"
                           >
                    {
                      guessedPhrase.map((word, ind) => (
                        <span className={mistakes.indexOf(word)!==-1 ? 'draggyWord false' : 'draggyWord'}
                              key={word+ind}
                              id={`card-${ind}`}
                              onClick={(e) => handleClickAnswer(e, word) }>
                                {word}
                        </span>))
                    }
            </div>
        </div>
      </div>
    </div>
  )
}