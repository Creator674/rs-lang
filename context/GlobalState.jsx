import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Context } from './app-context'
import { isAuthenticated, getLocalStorageProp, getStatistic, getSettings, getAllUserWords } from 'lib' // getWords
import { TramRounded, TrendingUpRounded } from '@material-ui/icons'

const initialCardSettings = {
  learnNew: false,
  repeatNew: false,
  difficultOnly: false,
  autoSoundplay: true,
  level: 0,
  levels: '0,1,2,3,4,5',
  perPage: 20,
  amountOfWords: 5,
  amountOfCards: 30,
  showWord: true,
  showTranslation: true,
  showTranscription: false,
  addPronunciation: true,
  addIllustration: false,
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
}

const currentCardSettings = {
  learnNew: false,
  repeatNew: false,
  difficultOnly: false,
  autoSoundplay: true,
  level: 0,
  levels: '0,1,2,3,4,5',
  perPage: 20,
  wordsFetched: {
    level: 0
  },

  amountOfWords: 5,
  amountOfCards: 30,
  showWord: true,
  showTranslation: true,
  showTranscription: false,
  addPronunciation: true,
  addIllustration: false,
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
}

const initialSort = {
  field: 0,
  direction: 'asc',
}

const initialLearnProgress = {
  total: 50,
  current: 0,
}

const initialAppSettings = {
  isAuthorized: null,
}

const GlobalState = (props) => {
  const { pathname, events } = useRouter()
  const [path, setPath] = useState('/')

  const [words, setWords] = useState([])
  const [sort, setSort] = useState(initialSort)
  const [activeMenu, setActiveMenu] = useState(0)
  const [toRepeatWords, setToRepeatWords] = useState(0)
  const [newWords, setNewWords] = useState(0)
  const [isAudioOn, setAudio] = useState(true)

  const [learnProgress, setLearnProgress] = useState(initialLearnProgress)
  const [userData, setUserData] = useState({})

  // settings
  const [appSettings, setAppSettings] = useState(initialAppSettings)

  const [defaultCardSettings] = useState(initialCardSettings)
  const [cardSettings, setCardSettings] = useState(currentCardSettings)

  // statistic
  const [appStatistics, setAppStatistics] = useState({})

  useEffect(() => {
    const { id, token } = getLocalStorageProp('user') || {}

    const isLogged = () => {
      return new Promise((resolve, reject) => {
        if (!id || !token) resolve(false)
        isAuthenticated(id, token)
          .then((response) => {
            setUserData({ ...userData, name: response.data.name })
            setAppSettings({ ...appSettings, isAuthorized: true })
            updateAppState()
            resolve(true)
          })
          .catch((err) => {
            // console.log('error: ', err.response ? err.response.data : err.message)
            resolve(false)
          })
      })
    }

    const updateAppState = () => {
      getAllUserWords().then(response => {
        console.log('RESPONSE WORDS', response.data)
      })
      getStatistic().then((response) => {
        setAppStatistics({ ...appStatistics, ...response.data.optional })
      })
      getSettings().then((response) => {
        console.log(response.data, 'APP SETTINGS')
        setCardSettings({ ...cardSettings, ...response.data.optional })
      })
    }

    const handleRouteChange = (url) => {
      if (url !== '/' && !appSettings.isAuthorized) {
        isLogged().then((result) => {
          if (!result) window.location.href = '/'
        })
      }
    }

    if (pathname !== '/' && appSettings.isAuthorized === null) {
      isLogged().then((result) => {
        if (!result) window.location.href = '/'
      })
    }

    if (!appSettings.isAuthorized && pathname !== '/') {
      isLogged().then((result) => {
        if (!result) window.location.href = '/'
      })
    } else {
      isLogged().then((result) => {
        if (!result && pathname !== '/') window.location.href = '/'
        else if (result) {
          updateAppState()
        }
      })
    }

    events.on('routeChangeStart', handleRouteChange)
    return () => {
      events.off('routeChangeStart', handleRouteChange)
    }
  }, [appSettings.isAuthorized])

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
      {pathname === '/' || (pathname !== '/' && appSettings.isAuthorized) ? props.children : null}
    </Context.Provider>
  )
}

export default GlobalState
