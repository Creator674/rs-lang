import React from 'react'
import Popover from '@material-ui/core/Popover'

export default function popover(props) {
  return (
    <Popover
      {...props}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      {props.children}
    </Popover>
  )
}
