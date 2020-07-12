import React, { useState } from 'react'

import { Context } from './app-context'
import {TramRounded} from '@material-ui/icons';

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
  learnNew: true,
  repeatNew: true,
  difficultOnly: true,
  autoSoundplay: false,
  level: "medium",
  amountOfWords: 12,
  amountOfCards: 12,
  showWord: false,
  showTranslation: false,
  showTranscription: false,
  addPronunciation: false,
  addIllustration: false,
  showDefenition: false,
  defenitionTranslation: false,
  defenitionPronunciation: false,
  expampleOfUsage: false,
  exampleOfUsageTranslation: false,
  exampleOfUsagePronunciation: false,
  REPEATbutton: false,
  HARDbutton: true,
  SHOWANSWERbutton: true,
  EASYbutton: true,
}

const currentCardSettings = {
  learnNew: true,
  repeatNew: true,
  difficultOnly: false,
  autoSoundplay: false,
  level: "hard",
  amountOfWords: 30,
  amountOfCards: 30,
  showWord: true,
  showTranslation: false,
  showTranscription: true,
  addPronunciation: false,
  addIllustration: true,
  showDefenition: false,
  defenitionTranslation: true,
  defenitionPronunciation: false,
  expampleOfUsage: true,
  exampleOfUsageTranslation: false,
  exampleOfUsagePronunciation: true,
  REPEATbutton: false,
  HARDbutton: true,
  SHOWANSWERbutton: false,
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
  isAuthorized: false,
  isModal: false,
}

const GlobalState = (props) => {
  const [words, setWords] = useState(initialWords)
  const [sort, setSort] = useState(initialSort)
  const [activeMenu, setActiveMenu] = useState(0)
  const [toRepeatWords, setToRepeatWords] = useState(22)
  const [newWords, setNewWords] = useState(30)
  const [isAudioOn, setAudio] = useState(true)

  const [cardSettings, setCardSettings] = useState(currentCardSettings)
  const [learnProgress, setLearnProgress] = useState(initialLearnProgress)
  const [appSettings, setAppSettings] = useState(initialAppSettings)
  const [defaultCardSettings, setDefaultCardSettings] = useState(initialCardSettings)
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
        defaultCardSettings
      }}
    >
      {props.children}
    </Context.Provider>
  )
}

export default GlobalState
