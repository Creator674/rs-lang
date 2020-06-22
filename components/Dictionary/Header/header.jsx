import React from 'react'
import './header.less'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  header: {
    fontWeight: 300,

    fontFamily: theme.props.mainFont,
    fontSize: '1.8rem',
    lineHeight: '2.3rem',
    paddingLeft: 36,
    paddingBottom: 16,
  },

  container: {
    display: 'flex',
    alignItems: 'center',
  },
  sortBtn: {
    background: 'transparent',
    border: `1px solid ${theme.palette.common.main}`,
    borderRadius: '0.4rem',
    width: '3.2rem',
    height: '3.2rem',
    boxSizing: 'border-box',
    padding: 0,
    '& i:before': {
      fontSize: '2.4rem',
      transform: 'rotate(90deg)',
      margin: 0,
    },
  },
  learned: {
    '& span': {
      fontFamily: theme.props.secondFont,
      fontWeight: 400,
    },
  },
}))

export function Header(props) {
  const classes = useStyles()

  return (
    <div className={classes.header}>
      <div className={classes.learned}>
        Learned words: <span>220 (84 today)</span>
      </div>
      <div className={classes.container}>
        <div className='sort'>Sort by: &nbsp;</div>
        <button className={classes.sortBtn}>
          <i className='icon-sliders'></i>
        </button>
      </div>
    </div>
  )
}
