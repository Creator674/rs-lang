import React, { useContext } from 'react'
import './header.less'

import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Popover from '../Popover/popover'
import Menu from '../SubMenu/sub-menu'
import { Context, DictionaryContext } from '../../../context'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  header: {
    fontWeight: 300,

    fontFamily: theme.props.mainFont,
    fontSize: '1.8rem',
    lineHeight: '2.3rem',
    padding: '0 3.2rem 1.6rem',
    '& i:before': {
      color: theme.palette.common.text,
    },
  },

  container: {
    display: 'flex',
    alignItems: 'center',
    '& div.sort': {
      flexShrink: 0,
    },
  },
  sortBtn: {
    background: 'transparent',
    border: `1px solid ${theme.palette.common.main}`,
    borderRadius: '0.4rem',
    width: '3.2rem',
    height: '3.2rem',
    boxSizing: 'border-box',
    padding: 0,
    flexShrink: 0,
    '& i:before': {
      fontSize: '2.4rem',
      transform: 'rotate(90deg)',
      margin: 0,
      color: theme.palette.common.text,
    },
  },
  learned: {
    '& span': {
      fontFamily: theme.props.secondFont,
      fontWeight: 400,
    },
  },

  popover: {
    fontFamily: theme.props.mainFont,
    fontSize: '1.8rem',
    lineHeight: '2.3rem',
    padding: '0.9rem',
    borderRadius: '0.8rem',
  },
  paper: {
    background: theme.palette.background.add,
    padding: '0.9rem',
  },

  input: {
    '& > *': {
      marginLeft: '2rem',
    },
    '& label.Mui-focused': {
      color: 'none',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'none',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'none',
      },
      '&:hover fieldset': {
        borderColor: 'none',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'none',
      },
      '& .MuiInput-underline:before': {
        borderBottom: 'none !important',
      },
    },
  },
}))

export function Header({words}) {
  const [isPopover, setIsPopover] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [filter, setFilter] = React.useState('')
  const classes = useStyles()

  const { setFilteredList } = useContext(DictionaryContext)
  // const { words } = useContext(Context)

  const handleClose = ({ currentTarget }) => {
    setAnchorEl(!isPopover ? currentTarget : null)
    setIsPopover(!isPopover)
  }

  const applyFilter = (filter) => {
    console.log('filter', words)
    const filtered = [...words].filter((el) => el.optional && el.optional.word.includes(filter))
    setFilteredList(filter ? filtered : [])
  }

  const ClearFiler = () => (
    <i
      className='icon-cancel-1'
      style={{ cursor: 'pointer' }}
      onClick={() => {
        setFilter('')
        applyFilter('')
      }}
    ></i>
  )
  return (
    <div className={classes.header}>
      <div className={classes.learned}>
        Learned words: <span>220 (84 today)</span>
      </div>
      <div className={classes.container}>
        <div className='sort'>Sort&nbsp;by: &nbsp;</div>
        <button className={classes.sortBtn} onClick={handleClose}>
          <i className='icon-sliders'></i>
        </button>
        <TextField
          className={classes.input}
          shrink='false'
          value={filter}
          onChange={({ target: { value } }) => {
            setFilter(value)
            applyFilter(value)
          }}
        />
        {filter ? <ClearFiler /> : <i className='icon-search'></i>}

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
              vertical: 'center',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <Menu words={words} />
          </Popover>
        ) : null}
      </div>
    </div>
  )
}
