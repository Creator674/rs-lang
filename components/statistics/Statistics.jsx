import React, { useState, useEffect, useContext, createContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'
import theme from './theme'

import { getStatistic } from 'lib'
import { Context } from 'context'


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

  const [amountOfWords, setAmountOfWords] = useState(0)
  const [allcorrectAnswers, setCorrectAnswers] = useState(0)

  const [savannah, setSavannah] = useState([])
  const [speakit, setSpeakit] = useState([])
  const [sprint, setSprint] = useState([])
  const [audiocall, setAudiocall] = useState([])
  const [hangman, setHangman] = useState([])
  const [puzzle, setPuzzle] = useState([])
  const classes = useStyles()

  const {
    appStatistics,
    setAppStatistics,
    words,
    userData,
  } = useContext(Context)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  useEffect(()=>{
    getStatistic().then((res) => {
      if(res.data.optional){
        console.log(res.data.optional)
        setAppStatistics({ ...appStatistics, ...res.data.optional })
        
        console.log(  Object.entries(res.data.optional)  )
        setAmountOfWords(  Object.entries(res.data.optional).reduce((acc, el) => {
          if(el[0].length > 20){
            console.log(el)
            acc += 1
          }
          return acc
        }, 0) )
        setCorrectAnswers(  Object.entries(res.data.optional).reduce((acc, el) => {
          if(el[0].length > 20){
            const entries = Object.entries(el[1])
            console.log( entries )
            entries.forEach((el) => {
              if(el[1].guessed){
                acc += +el[1].guessed
              }
            }) 
          }
          return acc
        }, 0) )


        setSavannah(  Object.entries(res.data.optional).filter((el) => el[0] == 'savannah')) 
        setSpeakit(  Object.entries(res.data.optional).filter((el) => el[0] == 'speakit')) 
        setSprint(  Object.entries(res.data.optional).filter((el) => el[0] == 'sprint')) 
        setAudiocall((data) => Object.entries(res.data.optional).filter((el) => el[0] == 'audiocall')) 
        setHangman((data) => Object.entries(res.data.optional).filter((el) => el[0] == 'hangman')) 
        setPuzzle((data) => Object.entries(res.data.optional).filter((el) => el[0] == 'puzzle')) 
      
      }

      
    })
  }, [])

  



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
          newCards={amountOfWords}
          winrate={amountOfWords}
          totalCards={amountOfWords}
          studyTime={''}
          strike={amountOfWords / allcorrectAnswers * 100}
          repeat={''}
          userName={userData.name}
        />
      </TabPanel>


      <TabPanel value={value} index={1}>
        <СardArchive learntWords={amountOfWords} day1={30} day2={40} day3={55} day4={10} day5={7} day6={30} day7={40} />
      </TabPanel>


      <TabPanel value={value} index={2}>
        <СardGames
          learntWords={amountOfWords}
          correctCount={allcorrectAnswers}
          mistakesCount={amountOfWords - allcorrectAnswers}

          savannah={savannah}
          speakit={speakit}
          sprint={sprint}
          audiocall={audiocall}
          hangman={hangman}
          puzzle={puzzle}
        />
      </TabPanel>
    </div>
  )
}
