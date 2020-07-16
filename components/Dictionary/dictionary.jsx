import React, { useState, useEffect, useContext, createContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { Card } from './Card'
import theme from '../../layouts/theme'

import './dictionary.less'

import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { getAllUserWords } from 'lib'

import { Header } from './Header'
import { Context, DictionaryContext } from '../../context'

const useStyles = makeStyles( {
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  paper: {
    width: '100%',
    backgroundColor: 'transparent'
  },
  overflow: {
    overflow: 'auto',
    maxHeight: '65vh'
  },

  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  leftBorder: {
    borderLeft: `0.1rem solid ${theme.palette.common.success}`,
  },
  rightBorder: {
    borderRight: `0.1rem solid ${theme.palette.common.success}`,
  },
} )

function TabPanel( props ) {
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

const style = createMuiTheme( {
  overrides: {
    MuiPaper: {
      root: {
        width: '100%',
      },
    },
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
        width: '100%',
      },
    },

    MuiTab: {
      root: {
        padding: '0 !important',
        minWidth: '0 !important',
        borderTop: '0.1rem solid',
        borderBottom: '0.1rem solid',
        borderColor: theme.palette.common.success,
        fontFamily: theme.props.mainFont,
        backgroundColor: fade( theme.palette.background.success, 0.3 ),
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
} )

export function Dictionary() {
  const {
    cardSettings: { isTranslation, isTranscription },
  } = useContext( Context )
  const [value, setValue] = useState( 1 )
  const [wordsList, setWords] = useState( [] )
  const [hardList, setHardList] = useState( [] )
  const [learnList, setLearnList] = useState( [] )
  const [easyList, setEasyList] = useState( [] )

  const [filteredList, setFilteredList] = useState( [] )

  const handleChange = ( event, newValue ) => {
    setValue( newValue )
  }

  useEffect( () => {
    if ( filteredList.length ) {
      setHardList( filteredList.filter( word => word.optional.status === 'hard' ) )
      setEasyList( filteredList.filter( word => word.optional.status === 'easy' ) )
      setLearnList( filteredList.filter( word => word.optional.status === undefined ) )
    } else if ( wordsList.length ) {
      setHardList( wordsList.filter( word => word.optional.status === 'hard' ) )
      setEasyList( wordsList.filter( word => word.optional.status === 'easy' ) )
      setLearnList( wordsList.filter( word => word.optional.status === undefined ) )
    } else {
      getAllUserWords().then( response => {
        setWords( response.data )
        setHardList( response.data.filter( word => word.optional.status === 'hard' ) )
        setEasyList( response.data.filter( word => word.optional.status === 'easy' ) )
        setLearnList( response.data.filter( word => word.optional.status === undefined ) )
      } )
    }
    // setWords( words.filter( word => word.optional ) )
  }, [wordsList] )

  const classes = useStyles()
  const LearnCards = ( filteredList.length ? filteredList : learnList ).map( ( word ) => {
    return <Card key={word.id || word._id} {...word.optional} wordObj={word} />
  } )
  const HardCards = ( filteredList.length ? filteredList : hardList ).map( ( word ) => {
    return <Card key={word.id || word._id} {...word.optional} wordObj={word} />
  } )
  const EasyCards = ( filteredList.length ? filteredList : easyList ).map( ( word ) => {
    return <Card key={word.id || word._id} {...word.optional} wordObj={word} />
  } )

  return (
    <DictionaryContext.Provider
      value={{
        setFilteredList,
        setWords,
        isTranscription,
        setEasyList,
        setHardList,
        setLearnList,
        hardList,
        learnList,
        easyList
      }}
    >
      <Paper className={classes.paper} square>
        <Header setWords={setWords} words={wordsList} />
        <MuiThemeProvider theme={style}>
          <Tabs value={value} onChange={handleChange} variant='fullWidth' aria-label='icon label tabs example' centered>
            <Tab className={classes.rightBorder} label='Hard' />
            <Tab label='Learning words' />
            <Tab className={classes.leftBorder} label='Easy' />
          </Tabs>
        </MuiThemeProvider>
      </Paper>
      <TabPanel value={value} index={0}>
        {/* hard */}
        {HardCards.length ? HardCards : <div className='card-box-1'><p>There is no words yet</p></div>}
      </TabPanel>
      <TabPanel value={value} index={1} className={classes.overflow}>
        {/* learn */}
        {LearnCards}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {/* easy */}
        {EasyCards.length ? EasyCards : <div className='card-box-1'><p>There is no words yet</p></div>}
      </TabPanel>
    </DictionaryContext.Provider>
  )
}
