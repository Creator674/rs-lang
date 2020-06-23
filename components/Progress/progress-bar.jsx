import React from 'react'

import { createStyles, makeStyles } from '@material-ui/core/styles'
import Progress from './progress'

const useStyles = makeStyles((theme) =>
  createStyles({
    label: {
      width: '2rem',
      fontSize: '1.8rem',
      fontFamily: theme.props.mainFont,
      fontWeight: 600,
      color: theme.palette.common.main,
    },

    labelRight: {
      marginLeft: '2rem',
    },
    labelLeft: {
      marginRight: '2rem',
    },
  })
)

export default function progressBar({ current, total, width }) {
  const style = { margin: '0 auto', display: 'flex', alignItems: 'center', width: `${width}`, padding: '0.8rem' }
  const classes = useStyles()
  const percentage = ((current / total) * 100).toFixed(2)
  return (
    <div style={style}>
      <span className={`${classes.label} ${classes.labelLeft}`}>{current}</span>
      <Progress value={percentage} />
      <span className={`${classes.label} ${classes.labelRight}`}>{total}</span>
    </div>
  )
}
