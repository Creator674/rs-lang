import React, {useContext} from 'react'
import { DropdownMenu } from './DropdownMenu/dropdownMenu'
import { makeStyles } from '@material-ui/core/styles'
import {Context} from 'context'
import Popover from '../Dictionary/Popover/popover'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  dropdownMenu: {
    fontWeight: 300,
    fontFamily: theme.props.mainFont,
    fontSize: '1.8rem',
    lineHeight: '2.3rem',
    padding: '1.6rem',
    // padding: '0 3.2rem 1.6rem',
    '& i:before': {
      color: theme.palette.common.text,
    },
  },

  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  avatarBtn: {
    background: 'transparent',
    border: `2px solid ${theme.palette.common.main}`,
    borderRadius: '50%',
    width: '6rem',
    height: '6rem',
    boxSizing: 'border-box',
    padding: 0,
    flexShrink: 0,

    '& i:before': {
      fontSize: '2.4rem',
      margin: 0,
      color: theme.palette.common.text,
    },
  },

  popover: {
    fontFamily: theme.props.mainFont,
    fontSize: '1.8rem',
    lineHeight: '2.3rem',
    padding: '0.9rem',
    borderRadius: '0.8rem',
    marginTop: '0.8rem',
  },
  paper: {
    background: theme.palette.background.add,
    padding: '0.9rem',
  },
}))

export const UserAvatar = ({ userName }) => {
  const {userData} = useContext(Context)
  const [isPopover, setIsPopover] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const classes = useStyles()

  const handleClose = ({ currentTarget }) => {
    setAnchorEl(!isPopover ? currentTarget : null)
    setIsPopover(!isPopover)
  }

  return (
    <div className={classes.dropdownMenu}>
      <div className={classes.container}>
        <div className='userAvatar'>Hi,&nbsp;{userData.name}&nbsp;</div>
        <button className={classes.avatarBtn} onClick={handleClose}>
          <i className='icon-github-circled'></i>
        </button>

        {isPopover ? (
          <Popover
            classes={{
              root: classes.popover,
              paper: classes.paper,
            }}
            onClose={handleClose}
            anchorEl={anchorEl}
            open={isPopover}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            container={anchorEl.parentNode}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <DropdownMenu closePopover={() => setIsPopover(false)} />
          </Popover>
        ) : null}
      </div>
    </div>
  )
}
