import React, { useState, useEffect, useContext, createContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { Word } from './Word'
import theme from '../../layouts/theme'

import './dictionary.less'

import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import { Header } from './Header'
import { Context, DictionaryContext } from '../../context'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
})

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  )
}

const style = createMuiTheme({
  overrides: {
    MuiBox: {
      root: {
        padding: 0,
      },
    },
    MuiTabs: {
      indicator: {
        backgroundColor: 'transparent',
      },
      root: {
        height: '4.7rem',
        minWidth: 0,
        color: theme.palette.common.success,
        fontSize: '2rem',
      },
    },
    MuiTab: {
      root: {
        minWidth: '0 !important',
        border: '0.1rem solid',
        borderColor: theme.palette.common.success,
        fontFamily: theme.props.mainFont,
        backgroundColor: fade(theme.palette.background.success, 0.3),
        color: theme.palette.common.success,
        fontSize: '1.6rem',
        lineHeight: 1,

        '&:hover': {
          backgroundColor: theme.palette.background.success,
          color: theme.palette.common.success,
        },
        '&$textColorInherit': {
          opacity: 1,
        },
        '&$selected': {
          backgroundColor: theme.palette.background.success,
          color: theme.palette.common.text,
          '&:hover': {
            backgroundColor: theme.palette.background.success,
            color: theme.palette.common.success,
          },
        },
      },

      selected: {},
    },
  },
})

export function Dictionary() {
  const { words } = useContext(Context)
  const [value, setValue] = useState(1)
  const [wordsList, setWords] = useState([])
  const [filteredList, setFilteredList] = useState([])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    setWords(words)
  }, [])

  const classes = useStyles()
  const Cards = (filteredList.length ? filteredList : wordsList).map((word) => {
    return <Word key={word.word} {...word} />
  })

  return (
    <DictionaryContext.Provider
      value={{
        setFilteredList,
        setWords,
      }}
    >
      <Paper square>
        <Header setWords={setWords} />
        <MuiThemeProvider theme={style}>
          <Tabs value={value} onChange={handleChange} variant='fullWidth' aria-label='icon label tabs example' centered>
            <Tab label='Hard' />
            <Tab label='Learning words' />
            <Tab label='Easy' />
          </Tabs>
        </MuiThemeProvider>
      </Paper>
      <TabPanel value={value} index={0}>
        Tab 1
      </TabPanel>
      <TabPanel value={value} index={1}>
        {Cards}
      </TabPanel>
      <TabPanel value={value} index={2}>
        Tab 3
      </TabPanel>
    </DictionaryContext.Provider>
  )
}
