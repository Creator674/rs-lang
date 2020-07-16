import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { Context } from './app-context'
import { isAuthenticated, getLocalStorageProp, getStatistic, getSettings, getAllUserWords, fetchWordsFromDB, aggregatedWords, saveSettings, preFetchWords } from 'lib'

const initialCardSettings = {
  learnNew: false,
  repeatNew: false,
  difficultOnly: false,
  autoSoundplay: true,
  level: 0,
  levels: '0,1,2,3,4,5',
  perPage: 20,
  wordsFetched: {},
  amountOfWords: 5,
  amountOfCards: 30,
  showWord: false,
  showTranslation: true,
  showTranscription: false,
  addPronunciation: true,
  addIllustration: true,
  showDefenition: false,
  defenitionTranslation: false,
  defenitionPronunciation: false,
  expampleOfUsage: true,
  exampleOfUsageTranslation: true,
  exampleOfUsagePronunciation: true,
  REPEATbutton: true,
  HARDbutton: true,
  SHOWANSWERbutton: true,
  EASYbutton: true,
  isGlobalSound: true,
}

const currentCardSettings = {
  learnNew: false,
  repeatNew: false,
  difficultOnly: false,
  autoSoundplay: true,
  level: 0,
  levels: '0,1,2,3,4,5',
  perPage: 20,
  wordsFetched: {},
  amountOfWords: 5,
  amountOfCards: 30,
  showWord: false,
  showTranslation: true,
  showTranscription: false,
  addPronunciation: true,
  addIllustration: true,
  showDefenition: false,
  defenitionTranslation: false,
  defenitionPronunciation: false,
  expampleOfUsage: true,
  exampleOfUsageTranslation: true,
  exampleOfUsagePronunciation: true,
  REPEATbutton: true,
  HARDbutton: true,
  SHOWANSWERbutton: true,
  EASYbutton: true,
  isGlobalSound: true,
}

const initialSort = {
  field: 0,
  direction: 'asc',
}

const initialLearnProgress = {
  total: 0,
  current: 0,
}

const initialAppSettings = {
  isAuthorized: null,
}

const GlobalState = ( props ) => {
  const { pathname, events } = useRouter()
  const [path, setPath] = useState( '/' )

  const [words, setWords] = useState( [] )
  const [sort, setSort] = useState( initialSort )
  const [activeMenu, setActiveMenu] = useState( 0 )
  const [toRepeatWords, setToRepeatWords] = useState( 0 )
  const [newWords, setNewWords] = useState( 0 )
  const [isAudioOn, setAudio] = useState( true )

  const [learnProgress, setLearnProgress] = useState( initialLearnProgress )
  const [userData, setUserData] = useState( {} )

  const wordsPage = useRef()

  // settings
  const [appSettings, setAppSettings] = useState( initialAppSettings )

  const [defaultCardSettings] = useState( initialCardSettings )
  const [cardSettings, setCardSettings] = useState( currentCardSettings )

  // statistic
  const [appStatistics, setAppStatistics] = useState( {} )

  useEffect( () => {
    const { id, token } = getLocalStorageProp( 'user' ) || {}

    const isLogged = () => {
      return new Promise( ( resolve, reject ) => {
        if ( !id || !token ) resolve( false )
        isAuthenticated( id, token )
          .then( ( response ) => {
            setUserData( { ...userData, name: response.data.name, email: response.data.email } )
            setAppSettings( { ...appSettings, isAuthorized: true } )
            resolve( true )
          } )
          .catch( ( err ) => {
            resolve( false )
          } )
      } )
    }

    const updateAppState = () => {

      getStatistic().then( ( response ) => {
        setAppStatistics( { ...appStatistics, ...response.data.optional } )
      } ).catch( err => { } )
      getSettings().then( ( response ) => {
        setCardSettings( { ...cardSettings, ...response.data.optional } )
        setLearnProgress( { ...learnProgress, total: response.data.optional ? response.data.optional.amountOfCards : cardSettings.amountOfCards } )

        // FETCH WORDS LOGIC
        const amountOfCards = response.data.optional ? response.data.optional.amountOfCards : cardSettings.amountOfCards
        const level = response.data.optional ? response.data.optional.level : cardSettings.level
        const difficultOnly = response.data.optional ? response.data.optional.difficultOnly : cardSettings.difficultOnly
        fetchWords( amountOfCards, level, difficultOnly )
      } ).catch( err => {
        fetchWords( cardSettings.amountOfCards, cardSettings.level )
      } )
    }

    const fetchWords = ( amountOfCards, group, difficultOnly ) => {

      preFetchWords( amountOfCards, group ).then( response => {
        if (difficultOnly) {
          const difficult = response.filter(word => word.optional && word.optional.status === 'hard')
          setWords( difficult )
        } else {
          setWords( response )
        }
      } )
    }

    const getWordsPage = () => {
      if ( cardSettings.wordsFetched[cardSettings.level] ) {
        wordsPage.current = cardSettings.wordsFetched[cardSettings.level].page
        return wordsPage.current
      } else {
        wordsPage.current = 0
        const tempWordsFetchedObj = { ...cardSettings.wordsFetched }
        tempWordsFetchedObj[cardSettings.level] = {
          page: wordsPage.current
        }
        setCardSettings( { ...cardSettings, wordsFetched: tempWordsFetchedObj } )
        saveSettings( { ...cardSettings, wordsFetched: tempWordsFetchedObj } )
        return wordsPage.current
      }
    }

    const handleRouteChange = ( url ) => {
      if ( url !== '/' && !appSettings.isAuthorized ) {
        isLogged().then( ( result ) => {
          if ( !result ) window.location.href = '/'
        } )
      }
    }

    if ( pathname !== '/' && appSettings.isAuthorized === null ) {
      isLogged().then( ( result ) => {
        if ( !result ) window.location.href = '/'
      } )
    }

    if ( !appSettings.isAuthorized && pathname !== '/' ) {
      isLogged().then( ( result ) => {
        if ( !result ) window.location.href = '/'
      } )
    } else {
      isLogged().then( ( result ) => {
        if ( !result && pathname !== '/' ) window.location.href = '/'
        else if ( result ) {
          updateAppState()
        }
      } )
    }

    events.on( 'routeChangeStart', handleRouteChange )
    return () => {
      events.off( 'routeChangeStart', handleRouteChange )
    }
  }, [appSettings.isAuthorized] )

  return (
    <Context.Provider
      value={{
        words,
        sort,
        activeMenu,
        setSort,
        setWords,
        setActiveMenu,
        toRepeatWords,
        setToRepeatWords,
        newWords,
        setNewWords,
        isAudioOn,
        setAudio,
        cardSettings,
        setCardSettings,
        learnProgress,
        setLearnProgress,
        appSettings,
        setAppSettings,
        defaultCardSettings,
        userData,
        setUserData,
        appStatistics,
        setAppStatistics,
      }}
    >
      {pathname === '/' || ( pathname !== '/' && appSettings.isAuthorized ) ? props.children : null}
    </Context.Provider>
  )
}

export default GlobalState


