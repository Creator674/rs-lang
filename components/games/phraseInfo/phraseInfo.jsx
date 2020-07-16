import React, {useEffect} from 'react'
import './phraseInfo.less'

export const PhraseInfo = props => {
  const { autoPronunc, pronunc, translat, currentTranslate, currentAudio} = props;

  const audioPlay = () => {
    const audio = new Audio();
    audio.src = currentAudio;
    audio.play();
  };

  useEffect(() => {
    if(autoPronunc){
      audioPlay()
    }
  }, [currentAudio]);

  return (
        <div className='phrase'>
          <span onClick={() => audioPlay()}> <img className={`audio-transl ${pronunc ? 'visibilityHid' : ''}`}
                      src='/images/puzzle/play.png'
                      width='40'
                      alt='audio'/>
          </span>
          <p className={`translation-text ${translat ? 'visibilityHid' : ''}`}>
            {currentTranslate}
          </p>
        </div>
  );
} 