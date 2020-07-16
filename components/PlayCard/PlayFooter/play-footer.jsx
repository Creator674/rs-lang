import React, { useContext, useRef, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'

import { Context } from 'context'

const useStyle = makeStyles( ( theme ) => ( {
  root: {
    position: 'relative',
    display: 'flex',
    padding: '1.6rem 0',
    borderTop: theme.borders.borderTop,
    '& .audio': {
      paddingTop: '0.4rem ',
      paddingRight: '0.8rem',
    },
    '& .card-chart': {
      position: 'absolute',
      top: 0,
      right: 0,
    },
    '& i:before': {
      fontSize: '1.8rem',
      fontWeight: 600,
      lineHeight: '2.3rem',
    },
  },
  word: {
    fontFamily: theme.props.secondFont,
    fontSize: '1.8rem',
    fontWeight: 600,
    lineHeight: '3rem',
    color: theme.palette.common.success,
    '& i.icon-volume:before': {
      color: theme.palette.common.text,
      cursor: 'pointer',
    },
  },
  transcription: {
    fontFamily: theme.props.mainFont,
    fontSize: '1.6rem',
    lineHeight: '2rem',
    color: theme.palette.common.textAdd,
  },
  translation: {
    fontFamily: theme.props.mainFont,
    fontSize: '1.8rem',
    fontWeight: 600,
    lineHeight: '2.3rem',
    marginTop: '0.4rem',
    color: theme.palette.common.text,
  },
} ) )

export const PlayFooter = ( {
  word: { word, transcription, wordTranslate },
  children,
  className,
  audio,
  isAudioLock,
  isGuessed,
  showTheAnswer,
  getResult,
  next
} ) => {
  const classes = useStyle()
  const audioElement = useRef()
  const {
    cardSettings: { showTranscription, showWord, showTranslation, defenitionPronunciation, isGlobalSound },
  } = useContext( Context )

  const playAudio = () => {

    if (!isGlobalSound) {
      if ( isGuessed === true ) return next()
      return
    }
    const playSecondAudio = () => {
      if ( isGuessed === true ) return next()
      if ( showTheAnswer === true ) return next()
      if ( !audio[1] || !defenitionPronunciation ) return
      audioElement.current.setAttribute( 'src', audio[1] )
      audioElement.current.removeEventListener( 'ended', playSecondAudio )
      audioElement.current.play().catch( ( err ) => err )
    }

    if ( Array.isArray( audio ) ) {
      audioElement.current.setAttribute( 'src', audio[0] )
      audioElement.current.addEventListener( 'ended', playSecondAudio )
      return audioElement.current.play().catch( ( err ) => err )
    } else {
      audioElement.current.addEventListener( 'ended', playSecondAudio )
      audioElement.current.setAttribute( 'src', audio )
      return audioElement.current.play().catch( ( err ) => err )
    }
  }

  useEffect( () => {
    isAudioLock === false && isGuessed !== true && playAudio()
    if ( isGuessed === true || showTheAnswer === true ) playAudio()
  }, [isAudioLock, isGuessed, showTheAnswer] )

  return (
    <div className={`${classes.root} ${className}`}>
      <div className='audio'>
        <i
          className='icon-volume'
          style={{ opacity: !isAudioLock ? 1 : 0.5 }}
          onClick={() => !isAudioLock && playAudio()}
        ></i>
      </div>
      <div>
        {showWord ? (
          <p className={classes.word} style={{ display: 'flex' }}>
            {word}
          </p>
        ) : null}
        {showTranscription ? <p className={classes.transcription}>{transcription}</p> : null}
        {showTranslation ? <p className={classes.translation}>{wordTranslate}</p> : null}
      </div>
      <div className='card-chart'>{children}</div>
      <audio ref={audioElement}></audio>
    </div>
  )
}
