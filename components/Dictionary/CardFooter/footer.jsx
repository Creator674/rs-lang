import React, { useContext } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { ProgressChart } from '../../Progress'
import Button from '@material-ui/core/Button'
import { DictionaryContext } from '../../../context'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    fontFamily: theme.props.mainFont,
    padding: '1.6rem 0',
    borderTop: theme.borders.borderTop,
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    '& div.info': {
      paddingLeft: '1.2rem',
    },
  },
  statistic: {
    fontSize: '1rem',
    lineHeight: '1.6rem',
    color: theme.palette.common.text,
    fontWeight: 300,
    '& span.data': {
      fontWeight: 500,
    },
  },
  button: {
    color: theme.palette.background.success,
    background: theme.palette.common.btnWhite,
    border: `0.1rem solid ${theme.palette.background.success} !important`,
    height: '3.2rem',
    borderRadius: '1.6rem',
    padding: '0 2rem',
    lineHeight: '1.6rem',
    fontSize: '1.6rem',
    fontWeight: 'normal',
    alignSelf: 'flex-end',
  },
}))

const statistic = {
  seen: '8 min ago',
  repeat: '3',
  next: '1 week',
}

const createStatInfo = (props) => {
  const classes = useStyles()
  const items = [
    { index: 'seen', value: 'Last seen: ' },
    { index: 'repeat', value: 'Repeated: ' },
    { index: 'next', value: 'Next time: ' },
  ]
  return items.map((item) => (
    <p key={item.index} className={classes.statistic}>
      {item.value}
      <span className='data'>{props[item.index]}</span>
    </p>
  ))
}

export const Footer = ({ wordInfo, learnIndex }) => {
  const context = useContext(DictionaryContext)
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <ProgressChart width='4.8rem' value={learnIndex} />
        <div className='info'>{createStatInfo(statistic)}</div>
      </div>
      <Button
        classes={{
          root: classes.button,
          outlined: classes.button,
        }}
        variant='outlined'
        disableElevation
      >
        RESTORE
      </Button>
    </div>
  )
}
