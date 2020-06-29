import React, { useContext } from 'react'

import { makeStyles } from '@material-ui/core/styles'

import { Context } from 'context'

const useStyle = makeStyles((theme) => ({
  root: {
    position: 'relative',
    display: 'flex',
    padding: '1.6rem 0',
    borderTop: theme.borders.borderTop,
    '& .audio': {
      paddingTop: '0.4rem ',
      paddingRight: '0.8rem'
    },
    '& .card-chart': {
      position: "absolute",
      top: 0,
      right: 0,
    },
    '& i:before': {
      fontSize: '1.8rem',
      fontWeight: 600,
      lineHeight: '2.3rem',
    }
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

export const PlayFooter = ({ word: { word, transcription, wordTranslate }, children, className }) => {
  const classes = useStyle()
  const {
    cardSettings: { isTranscription, isWordShown, isTranslation },
  } = useContext(Context)

  return (
    <div className={`${classes.root} ${className}`}>
      <div className='audio'>
        <i className='icon-volume'></i>
      </div>
      <div>
        {isWordShown ? <p className={classes.word} style={{ display: 'flex' }} >{word}</p> : null}
        {isTranscription ? <p className={classes.transcription}>{transcription}</p> : null}
        {isTranslation ? <p className={classes.translation}>{wordTranslate}</p> : null}
      </div>
      <div className="card-chart">{children}</div>
    </div>
  )
}
