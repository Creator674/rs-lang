import React, { useState, useEffect, useRef } from 'react'
import './gameboardPuzzle.less'
import { shuffledArray } from '../../..//lib/helpers/shufflefunc' 
import { PhraseInfo } from '../phraseInfo'


export const GameboardPuzzle = props => {
  const { pronunc, translat, picture, mistakes, showImage, autoPronunc, data, dontKnow, goOn, goToNext} = props;

  const [currentText, setCurrentText] = useState([]);
  const [currentTranslate, setCurrentTranslate] = useState('');
  const [currentAudio, setCurrentAudio] = useState('');

  const [shuffledArr, setShuffledArr] = useState([]);
  const [shuffledText, setShuffledText] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [ANSWERS, setANSWERS] = useState([]);
  const [guessedPhrase, setguessedPhrase] = useState([]);
  const dragItem = useRef();
  const dragNode = useRef();  

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
    


  const dragStart = e => {
    const target = e.target;
    e.dataTransfer.setData('card_id', target.id);
    setTimeout( () => {
      target.style.display = 'none';
    }, 0);
  }
  const dropFunction = (e) => {
    e.preventDefault();
    const card_id = e.dataTransfer.getData('card_id');
    const card = document.getElementById(card_id)
    card.style.display = 'block';
    e.target.appendChild(card);
  }

  const drawGuessedWords = () => {
      return ANSWERS.map(phrase => (
        <div className='guessed'> {phrase.map( el => (
              <span className='guessed-word' draggable='false' >{el}</span>
            ))}
        </div>)
      );
  };
  const dragOver = (e) => {
    e.preventDefault();
  }

  const dragCardOver = (e) => {
    e.stopPropagation();
  }

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
                  pronunc={pronunc} translat={translat}/>

        <div className='gameboard-container'>
           <div className='guessed_phrases_board' 
               style={{ backgroundImage: picture }}>
              { drawGuessedWords() }
           </div>

           <div className='dragging-words-container'>
              { 
                  <div className='word-container' 
                      onDrop={dropFunction} 
                      onDragOver={dragOver}>
                    {
                      shuffledText.map((word, ind) => (
                        <span draggable='true' 
                              className='draggyWord'
                              key={ind}
                              id={`card-${ind}`}
                              onDragStart={dragStart}
                              onDragOver={dragCardOver}
                              onClick={(e) => handleClickWord(e, word) }>
                                {word}
                        </span>))
                    }
                  </div>
                }
            </div>       
           
            <div className='answer-wrapper'>
                      <div className="word-container input-results"
                           onDrop={dropFunction} 
                           onDragOver={dragOver}>
                    {
                      guessedPhrase.map((word, ind) => (
                        <span draggable='true' 
                              className={mistakes.indexOf(word)!==-1 ? 'draggyWord false' : 'draggyWord'}
                              key={ind}
                              id={`card-${ind}`}
                              onDragStart={dragStart}
                              onDragOver={dragCardOver}
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