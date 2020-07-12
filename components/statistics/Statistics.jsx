import React, { useState, useEffect, useContext, createContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'
import theme from './theme'

import './statistics.less'

import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import СardToday from './cardToday/cardToday'
import СardArchive from './cardArchive/cardArchive'
import СardGames from './cardMiniGames/cardGames'

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
  leftBorder: {
    borderLeft: `0.1rem solid ${theme.palette.common.border}`,
  },
  rightBorder: {
    borderRight: `0.1rem solid ${theme.palette.common.border}`,
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
        <Box p={0}>
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
        color: theme.palette.common.addDark,
        fontSize: '2rem',
      },
    },

    MuiTab: {
      root: {
        padding: '0 !important',
        minWidth: '0 !important',
        borderTop: '0.1rem solid',
        borderBottom: '0.1rem solid',
        borderColor: theme.palette.common.border,
        fontFamily: theme.props.mainFont,
        backgroundColor: fade(theme.palette.background.root, 0.3),
        color: theme.palette.common.colorRoot,
        fontSize: '1.6rem',
        lineHeight: 1,

        '&:hover': {
          backgroundColor: theme.palette.background.tabHover,
          color: theme.palette.common.colorRoot,
        },
        '&$textColorInherit': {
          opacity: 1,
        },
        '&$selected': {
          backgroundColor: theme.palette.background.selected,
          color: theme.palette.common.colorSelected,
          '&:hover': {
            backgroundColor: theme.palette.background.selectedHover,
            color: theme.palette.common.colorRoot,
          },
        },
      },

      selected: {},
    },
  },
})

export function Statistics() {
  const [value, setValue] = useState(1)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const classes = useStyles()

  return (
    <div style={{ width: '100%', diplay: 'flex', flexDirection: 'column' }}>
      <Paper square>
        <MuiThemeProvider theme={style}>
          <Tabs value={value} onChange={handleChange} variant='fullWidth' aria-label='icon label tabs example' centered>
            <Tab className={classes.rightBorder} label='TODAY' />
            <Tab label='Archive' />
            <Tab className={classes.leftBorder} label='MINI GAMES' />
          </Tabs>
        </MuiThemeProvider>
      </Paper>
      <TabPanel value={value} index={0}>
        <СardToday
          newCards={50}
          winrate={79}
          totalCards={150}
          studyTime={49}
          strike={210}
          repeat={15}
          userName={'Olga'}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <СardArchive learntWords={553} day1={30} day2={40} day3={55} day4={10} day5={7} day6={30} day7={40} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <СardGames
          game={'Super Mario'}
          learntWords={553}
          correctCount={80}
          mistakesCount={15}
          day1={30}
          day2={40}
          day3={55}
          day4={10}
          day5={7}
          day6={30}
          day7={40}
          playedGame0={23}
          playedGame1={15}
          playedGame2={17}
          playedGame3={32}
          playedGame4={10}
          playedGame5={51}
        />
      </TabPanel>
    </div>
  )
}
