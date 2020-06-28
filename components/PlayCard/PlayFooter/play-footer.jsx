import React, { useContext } from 'react'

import { makeStyles } from '@material-ui/core/styles'

import { Context } from '../../../context'

const useStyle = makeStyles((theme) => ({
  root: {
    position: 'relative',
    padding: '1.6rem 0',
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

export const PlayFooter = ({ word, transcription, wordTranslate, children }) => {
  const classes = useStyle()
  const {
    cardSettings: { isTranscription, isWordShown, isTranslation },
  } = useContext(Context)

  return (
    <div className={classes.root}>
      <div>
        {isWordShown ? (
          <p className={classes.word} style={{ display: 'flex' }}>
            {word} &nbsp;&nbsp;
            <span>
              <i className='icon-volume'></i>
            </span>
          </p>
        ) : null}
        {isTranscription ? <p className={classes.transcription}>{transcription}</p> : null}
        {isTranslation ? (
          <p className={classes.translation}>
            {wordTranslate}{' '}
            {!isWordShown ? (
              <>
                &nbsp;&nbsp;
                <span>
                  <i className='icon-volume'></i>
                </span>
              </>
            ) : null}
          </p>
        ) : null}
      </div>
      {children}
    </div>
  )
}
