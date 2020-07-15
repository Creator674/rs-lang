import React, { useEffect, useState, useContext } from 'react'

import { makeStyles } from '@material-ui/core/styles'

import { MuiButton } from 'components'
import { CardText } from '../Dictionary'
import { ProgressChart } from '../Progress'
import { PlayImage, PlayFooter, PlayGuessField } from '.'
import { getAudio } from 'lib/helpers'
import { Context } from 'context'

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

export const PlayCard = ({ word, next }) => {
  console.log(word)
  const {
    cardSettings: { showDefenition, REPEATbutton, HARDbutton, SHOWANSWERbutton, EASYbutton, addIllustration, defenitionTranslation },
  } = useContext(Context)
  const classes = useStyles()
  const [audioWord, setAudioWord] = useState(null)
  const [audioMeaning, setAudioMeaning] = useState(null)
  const [audioExample, setAudioExample] = useState(null)
  const [isAudioLock, setAudioLock] = useState(true)
  const [isImageMinimized, setImageMinimized] = useState(false)

  const [isGuessed, setIsGuessed] = useState(false)

  let isMounted = false

  useEffect(() => {
    isMounted = true
    getAudio(word.audio).then((url) => {
      isMounted && setAudioWord(url)
    })
    showDefenition &&
      getAudio(word.audioMeaning).then((url) => {
        isMounted && setAudioMeaning(url)
      })
    getAudio(word.audioExample).then((url) => {
      isMounted && setAudioExample(url)
    })

    return () => {
      isMounted = false
    }
  }, [])

  // useEffect(()=>{
  //   isGuessed === true && next()
  // }, [isGuessed])

  return (
    <div className='play-card'>
      <div className='card-box'>
        <div className={classes.btnRow}>
          <div className='btn-wrapper card-wrapper'>
            {HARDbutton && <MuiButton themeName='hard'>Hard</MuiButton> }
            {REPEATbutton && <MuiButton themeName='repeat'>Repeat</MuiButton> }
           {EASYbutton && <MuiButton themeName='easy'>Easy</MuiButton> }
          </div>
          { SHOWANSWERbutton && <MuiButton themeName='answer'>Answer</MuiButton> }
        </div>
        <div className='play-image'>
          {addIllustration && <PlayImage src={word.image} isImageMinimized={isImageMinimized} setImageMinimized={setImageMinimized} /> }
        </div>
        <div className={`${classes.gameboard} card-wrapper`}>
          <CardText className='border-top-0' outerStyles={classes.styleDictionary} index='textExample' word={word}>
            <PlayGuessField
              word={word.word}
              setAudioLock={setAudioLock}
              setIsGuessed={setIsGuessed}
              isGuessed={isGuessed}
            />
          </CardText>
          {showDefenition ? (
            <CardText className='second-row' outerStyles={classes.styleDictionary} index='textMeaning' word={word} defenitionTranslation={defenitionTranslation} />
          ) : null}
          <PlayFooter
            word={word}
            audio={isGuessed === true ? audioExample : [audioWord, showDefenition ? audioMeaning : null]}
            isAudioLock={isAudioLock}
            isGuessed={isGuessed}
            getResult={() => isGuessed}
            next={next}
          >
            <ProgressChart width={'36px'} value={40} />
          </PlayFooter>
        </div>
      </div>
    </div>
  )
}
