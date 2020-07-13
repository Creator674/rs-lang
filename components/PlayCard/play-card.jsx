import React, { useEffect, useState, useContext } from 'react'

import { makeStyles } from '@material-ui/core/styles'

import { MuiButton } from 'components'
import { CardText } from '../Dictionary'
import { ProgressChart } from '../Progress'
import { PlayImage, PlayFooter, PlayGuessField } from '.'
import { getAudio } from 'lib/helpers'
import { Context } from 'context'
import { combineWordsForDictionary } from '../../lib/crud/auth'
import './play-card.less'

// const word = {
//   id: '5e9f5ee35eb9e72bc21af4a0',
//   group: 0,
//   page: 0,
//   word: 'alcohol',
//   image: 'files/01_0002.jpg',
//   audio: 'files/01_0002.mp3',
//   audioMeaning: 'files/01_0002_meaning.mp3',
//   audioExample: 'files/01_0002_example.mp3',
//   textMeaning: '<i>Alcohol</i> is a type of drink that can make people drunk.',
//   textExample: 'A person should not drive a car after he or she has been drinking <b>alcohol</b>.',
//   transcription: '[ǽlkəhɔ̀ːl]',
//   textExampleTranslate: 'Человек не должен водить машину после того, как он выпил алкоголь',
//   textMeaningTranslate: 'Алкоголь - это тип напитка, который может сделать людей пьяными',
//   wordTranslate: 'алкоголь',
//   wordsPerExampleSentence: 15,
// }

const useStyles = makeStyles((theme) => ({
  btnRow: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.up('xs')]: {
      padding: '1.6rem 0',
    },
    [theme.breakpoints.up('sm')]: {
      padding: '1.6rem',
    },
    [theme.breakpoints.up('md')]: {
      padding: '1.6rem 0',
    },
    padding: '1.6rem 0',

    '& .btn-wrapper > *': {
      marginRight: '0.8rem',
    },
  },
  gameboard: {
    [theme.breakpoints.up('xs')]: {
      padding: '0 2.4rem',
    },
    [theme.breakpoints.up('md')]: {
      padding: '0',
    },
  },

  styleDictionary: {
    padding: '2rem 0',
    '& p.sentence': {
      fontFamily: theme.props.secondFont,
      fontSize: '1.8rem',
      lineHeight: '3.0rem',
      marginBottom: '1rem',
      '& b': {
        fontWeight: 'bold',
        color: theme.palette.common.success,
      },
      '& i': {
        fontStyle: 'italic',
        color: theme.palette.common.success,
      },
    },
    '& p.translation': {
      fontSize: '1.8rem',
      lineHeight: '2.2rem',
      color: theme.palette.common.textAdd,
    },
  },
}))

export const PlayCard = (props) => {
  const {
    cardSettings: { isMeaning },
  } = useContext(Context)
  const classes = useStyles()

  const [data, setData] = useState([])
  const [count, setCount] = useState(0)
  const [currentWord, setCurrentWord] = useState(null)

  const [audioWord, setAudioWord] = useState(null)
  const [audioMeaning, setAudioMeaning] = useState(null)
  const [audioExample, setAudioExample] = useState(null)
  const [isAudioLock, setAudioLock] = useState(true)
  const [isImageMinimized, setImageMinimized] = useState(false)

  const [showTheAnswer, setShowAnswer] = useState(false)
  const [isGuessed, setIsGuessed] = useState(false)

  let isMounted = false

  useEffect(() => {
    isMounted = true
    combineWordsForDictionary(1,1).then((res)=>{
      console.log(res)
      isMounted && setData(res)
      isMounted && setCurrentWord(res[0]) 
    })
    return () => {
      isMounted = false
    }
  }, []);

  useEffect(() => {
    if(data.length){
      setCurrentWord(data[count])
      setAudioWord(data[count].sound)
      setAudioMeaning(data[count].audioMeaning)
      setAudioExample(data[count].audioExample)
    }
  }, [data])

  useEffect(() => {
    if(isGuessed){
      setCount(count + 1)
      return
    }
  }, [isGuessed]);

  console.log(audioWord,audioMeaning, audioExample )
// console.log(word)
  const addToHardSection = () => {
    console.log('haard')
  }
  const addToEasySection = () => {
    console.log('easy')
  }
  const repeatWord = () => {
    console.log('repeatWord')
  }
  const showAnswerClick = () => {
    setShowAnswer(answer => !answer)
  }
 
  

  return (
    <div className='play-card'>
      <div className='card-box'>
        <div className={classes.btnRow}>
          <div className='btn-wrapper card-wrapper'>
            <MuiButton themeName='hard'
                       action={addToHardSection}>Hard</MuiButton>
            <MuiButton themeName='repeat'
                       action={repeatWord}>Repeat</MuiButton>
            <MuiButton themeName='easy'
                       action={addToEasySection}>Easy</MuiButton>
          </div>
          <MuiButton themeName='answer'
                     action={showAnswerClick}>Answer</MuiButton>

        </div>
        <div className='play-image'>
          <PlayImage src={currentWord ? currentWord.image : ''} isImageMinimized={isImageMinimized} 
                     setImageMinimized={setImageMinimized} />
        </div>
        <div className={`${classes.gameboard} card-wrapper`}>
          <CardText className='border-top-0' 
                    outerStyles={classes.styleDictionary} index='textExample' 
                    word={currentWord? currentWord : null}>
            <PlayGuessField
              showTheAnswer={showTheAnswer}
              word={currentWord ? currentWord.word : null}
              setAudioLock={setAudioLock}
              setIsGuessed={setIsGuessed}
              isGuessed={isGuessed}
            />
          </CardText>
          {isMeaning ? (
            <CardText className='second-row' 
                      outerStyles={classes.styleDictionary} index='textMeaning' 
                      word={currentWord? currentWord : ''} />
          ) : null}
          <PlayFooter
            word={currentWord? currentWord : ''}
            audio={isGuessed === true ? audioExample : [audioWord, isMeaning ? audioMeaning : null]}
            isAudioLock={isAudioLock}
            isGuessed={isGuessed}
          >
            <ProgressChart width={'36px'} value={40} />
          </PlayFooter>
        </div>
      </div>
    </div>
  )
}
