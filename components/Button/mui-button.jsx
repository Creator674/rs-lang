import React from 'react'

import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

export function MuiButton({ children, action, styles }) {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      fontFamily: theme.props.mainFont,
      borderTop: theme.borders.borderTop,
      padding: '1.6rem 0',
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

  const classes = useStyles()
  return (
    <Button
      classes={{
        root: classes.button,
        outlined: classes.button,
      }}
      variant='outlined'
      disableElevation
      onClick={({ target }) => action()}
    >
      {children}
    </Button>
  )
}
