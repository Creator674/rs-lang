import React, { useEffect, useContext, useState, useRef } from 'react'
import { getAudio } from 'lib/helpers'
import { makeStyles } from '@material-ui/core/styles'
import Skeleton from '@material-ui/lab/Skeleton'

import { DictionaryContext, Context } from '../../../context'

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1.6rem 0',
    '& div.image': {
      borderRadius: '50%',
      overflow: 'hidden',
      border: theme.borders.borderTop,
      '& img': {
        objectFit: 'cover',
      },
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
}))

const normalImg = { width: '7.2rem', height: '7.2rem' }
const smallImg = { width: '4.8rem', height: '4.8rem' }

export const Word = ({ src, word, transcription, wordTranslate, isLoaded, audio, audioMeaning, audioExample }) => {
  const classes = useStyle()
  const { isTranscription } = useContext(DictionaryContext)
  const { cardSettings: { isGlobalSound } } = useContext(Context)

  const [audioWordSound, setAudioWord] = useState(null)
  const [audioMeaningSound, setAudioMeaning] = useState(null)
  const [audioExampleSound, setAudioExample] = useState(null)

  const audioElement = useRef()

  let isMounted = false

  useEffect(() => {
    isMounted = true
    getAudio(audio).then((url) => {
      isMounted && setAudioWord(url)
    })
    getAudio(audioMeaning).then((url) => {
      isMounted && setAudioMeaning(url)
    })
    getAudio(audioExample).then((url) => {
      isMounted && setAudioExample(url)
    })

    return () => {
      isMounted = false
    }
  }, [])

  const playAudio = () => {
    if (!isGlobalSound) return

    const playSecondAudio = () => {
      audioElement.current.setAttribute('src', audioMeaningSound)
      audioElement.current.removeEventListener('ended', playSecondAudio)
      audioElement.current.addEventListener('ended', playThirdAudio)
      audioElement.current.play().catch((err) => err)
    }

    const playThirdAudio = () => {
      audioElement.current.setAttribute('src', audioExampleSound)
      audioElement.current.removeEventListener('ended', playThirdAudio)
      audioElement.current.play().catch((err) => err)
    }

    if (audioWordSound) {
      audioElement.current.setAttribute('src', audioWordSound)
      audioElement.current.addEventListener('ended', playSecondAudio)
      return audioElement.current.play().catch((err) => err)
    }
  }

  return (
    <div className={classes.root}>
      <div>
        <p className={classes.word} style={{ display: 'flex' }}>
          {isLoaded ? word : <Skeleton animation='wave' variant='text' width={word.length * 9.6} />}&nbsp;&nbsp;
          <span>
            <i className='icon-volume' onClick={playAudio}></i>
          </span>
          <audio ref={audioElement}></audio>
        </p>
        {isTranscription ? (
          isLoaded ? (
            <p className={classes.transcription}>{transcription}</p>
          ) : (
            <Skeleton animation='wave' variant='text' width={transcription.length * 8} style={{ lineHeight: '2rem' }} />
          )
        ) : null}
        <p className={classes.translation}>
          {isLoaded ? wordTranslate : <Skeleton animation='wave' variant='text' width={wordTranslate.length * 9.2} />}
        </p>
      </div>
      <div className='image' style={isTranscription ? normalImg : smallImg}>
        {isLoaded ? (
          <img src={src} alt={`Associative image for ${word}`} style={isTranscription ? normalImg : smallImg} />
        ) : (
          <Skeleton animation='wave' variant='circle' style={isTranscription ? normalImg : smallImg} />
        )}
      </div>
    </div>
  )
}
