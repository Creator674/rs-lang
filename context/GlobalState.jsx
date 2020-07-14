import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Context } from './app-context'
import { isAuthenticated, getLocalStorageProp } from 'lib'
import { TramRounded, TrendingUpRounded } from '@material-ui/icons';

const initialWords = [
  {
    id: '5e9f5ee35eb9e72bc21af4a1',
    group: 0,
    page: 0,
    word: 'agree',
    image: 'files/01_0001.jpg',
    audio: 'files/01_0001.mp3',
    audioMeaning: 'files/01_0001_meaning.mp3',
    audioExample: 'files/01_0001_example.mp3',
    textMeaning: 'To <i>agree</i> is to have the same opinion or belief as another person.',
    textExample: 'The students <b>agree</b> they have too much homework.',
    transcription: '[əgríː]',
    textExampleTranslate: 'Студенты согласны, что у них слишком много домашней работы',
    textMeaningTranslate: 'Согласиться - значит иметь то же мнение или убеждение, что и другой человек',
    wordTranslate: 'согласна',
    wordsPerExampleSentence: 8,
  },
  {
    id: '5e9f5ee35eb9e72bc21af4a0',
    group: 0,
    page: 0,
    word: 'alcohol',
    image: 'files/01_0002.jpg',
    audio: 'files/01_0002.mp3',
    audioMeaning: 'files/01_0002_meaning.mp3',
    audioExample: 'files/01_0002_example.mp3',
    textMeaning: '<i>Alcohol</i> is a type of drink that can make people drunk.',
    textExample: 'A person should not drive a car after he or she has been drinking <b>alcohol</b>.',
    transcription: '[ǽlkəhɔ̀ːl]',
    textExampleTranslate: 'Человек не должен водить машину после того, как он выпил алкоголь',
    textMeaningTranslate: 'Алкоголь - это тип напитка, который может сделать людей пьяными',
    wordTranslate: 'алкоголь',
    wordsPerExampleSentence: 15,
  },
]

const initialSort = {
  field: 0,
  direction: 'asc',
}

const initialCardSettings = {
  learnNew: false,
  repeatNew: false,
  difficultOnly: false,
  autoSoundplay: true,
  level: "level1",
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
  level: "level1",
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
// const initialCardSettings = {
//   isTranslation: true,
//   isWordShown: true,
//   isTranscription: false,
//   isMeaning: true,
// }
const initialLearnProgress = {
  total: 50,
  current: 0,
}

const initialAppSettings = {
  isAuthorized: null,
}


const GlobalState = (props) => {
  const { pathname, events } = useRouter()
  const [ path, setPath ] = useState('/')

  const [words, setWords] = useState(initialWords)
  const [sort, setSort] = useState(initialSort)
  const [activeMenu, setActiveMenu] = useState(0)
  const [toRepeatWords, setToRepeatWords] = useState(22)
  const [newWords, setNewWords] = useState(30)
  const [isAudioOn, setAudio] = useState(true)

  const [learnProgress, setLearnProgress] = useState(initialLearnProgress)
  const [userData, setUserData] = useState({})

  // settings
  const [appSettings, setAppSettings] = useState(initialAppSettings)
  const [cardSettings, setCardSettings] = useState(currentCardSettings) // SET TO {}
  const [defaultCardSettings, setDefaultCardSettings] = useState(initialCardSettings)

  const [appStatistics, setAppStatistics] = useState({})


  useEffect(() => {
    const {id, token} = getLocalStorageProp('user') || {}

    const isLogged = () => {
      return new Promise((resolve, reject) => {
        if (!id || !token) resolve(false)
        isAuthenticated(id, token).then(response => {
          setUserData({...userData, name: response.data.name})
          setAppSettings({...appSettings, isAuthorized: true})
          resolve(true)
        }).catch(err => {
          console.log('error: ', err.response ? err.response.data : err.message)
          resolve(false)
        })
      })
    }


    const handleRouteChange = url => {
      if (url !== '/' && !appSettings.isAuthorized) {
        isLogged().then(result => {
          if (!result) window.location.href = '/'
        })
      }
    }

    if (pathname !== '/' && appSettings.isAuthorized === null) {
      isLogged().then(result => {
        if (!result) window.location.href = '/'
      })
    }

    if (!appSettings.isAuthorized && pathname !== '/') {
      isLogged().then(result => {
        if (!result) window.location.href = '/'
      })
    } else {
      isLogged().then(result => {
        if (!result && pathname !== '/') window.location.href = '/'
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
