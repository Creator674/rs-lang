import React from 'react'
import { withStyles, createStyles, makeStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.common.btnMiddle,
      borderRadius: 8,
    },
  })
)

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 8,
    height: 16,
  },
  colorPrimary: {
    backgroundColor: 'transparent',
  },
  bar: {
    borderRadius: 8,
    backgroundColor: theme.palette.common.main,
  },
}))(LinearProgress)

export default function CustomizedProgressBars({ value }) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <BorderLinearProgress variant='determinate' value={+value} />
    </div>
  )
}
