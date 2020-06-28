import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import { MuiButton } from 'components'
import { CardText } from '../Dictionary'
import { ProgressChart } from '../Progress'
import { PlayImage, PlayFooter } from '.'

import './play-card.less'

const word = {
  id: '5e9f5ee35eb9e72bc21af4a0',
  group: 0,
  page: 0,
  word: 'alcohol',
  image: 'files/01_0002.jpg',
  audio: 'files/01_0002.mp3',
  audioMeaning: 'files/01_0002_meaning.mp3',
  audioExample: 'files/01_0002_example.mp3',
  textMeaning: '<i>Alcohol</i> is a type of drink that can make people drunk.',
  textExample: 'A person should not drive a car after he or she has been drinking <b>alcohol</b>.',
  transcription: '[ǽlkəhɔ̀ːl]',
  textExampleTranslate: 'Человек не должен водить машину после того, как он выпил алкоголь',
  textMeaningTranslate: 'Алкоголь - это тип напитка, который может сделать людей пьяными',
  wordTranslate: 'алкоголь',
  wordsPerExampleSentence: 15,
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0 3.2rem',
    borderBottom: `0.1rem solid ${theme.palette.common.success}`,
  },
  styleDictionary: {
    padding: '1.6rem 0',
    '& p.sentence': {
      fontFamily: theme.props.secondFont,
      fontSize: '1.2rem',
      lineHeight: '1.6rem',
      marginBottom: '0.4rem',
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
      fontSize: '1.2rem',
      lineHeight: '1.4rem',
      color: theme.palette.common.textAdd,
    },
  },
}))

export function PlayCard() {
  const classes = useStyles()

  return (
    <div className='play-card'>
      <div className='card-box'>
        <div className='btns-row'>
          <div className='btn-wrapper'>
            <MuiButton>Hard</MuiButton>
            <button className='hard'>hard</button>
            <button className='repeat'>repeat</button>
            <button className='easy'>easy</button>
          </div>
          <button className='answer'>answer</button>
        </div>
        <div className='play-image'>
          <PlayImage src={word.image} />
        </div>
        <div className='gameboard'>
          <CardText outerStyles={classes.styleDictionary} index='textExample' word={word}>
            <input value='blabla' />
          </CardText>
          <CardText outerStyles={classes.styleDictionary} index='textMeaning' word={word} />
        </div>
        <PlayFooter>
          <ProgressChart width={'36px'} value={40} />
        </PlayFooter>
      </div>
    </div>
  )
}
