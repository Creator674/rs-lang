import React, { useState, useContext, useEffect } from 'react'

import { SettingsItem } from './components/SettingsItem'

import { SelectListDifficulty } from './components/SelectListDifficulty'

import { FormWrapper } from './components/FormWrapper'

import { InputSlider } from './components/InputSlider'

import { Button } from '../Button'

import { Context } from 'context'

import './settings-modal.less'

export const SettingsModal = () => {
  const { cardSettings, setCardSettings, defaultCardSettings } = useContext(Context)

  const [localSettings, setLocalSettings] = useState(cardSettings)

  const findTrue = (obj) => {
    for (let val in obj) {
      if (obj[val]) {
        return val
      }
    }
  }

  const [checkedRadio, setCheckedRadio] = useState(findTrue(localSettings))

  const changeRadioSetting = (e) => {
    document.querySelectorAll("input[type='radio']").forEach((elem) => {
      elem.checked = false
    })
    localSettings[checkedRadio] = false
    e.target.checked = true
    localSettings[e.target.value] = true
    setLocalSettings(localSettings)
    setCheckedRadio(e.target.value)
  }

  const changeSetting = (e) => {
    const currValue = e.target.value
    localSettings[currValue] = localSettings[currValue] ? false : true
    console.log(currValue, ' is ', localSettings[currValue])
    document.querySelectorAll(`input[value=${currValue}]`).forEach((elem) => {
      elem.checked = localSettings[currValue]
    })
  }

  const applySettings = () => {
    setCardSettings(localSettings)
    console.log(localSettings)
  }
  const [inputNewValue, setInputNewValue] = useState(cardSettings.amountOfCards)
  const resetSettings = () => {
    setInputNewValue(defaultCardSettings.amountOfCards)
    setLocalSettings(Object.assign({}, defaultCardSettings))
    setCardSettings(Object.assign({}, defaultCardSettings))
    document.querySelectorAll("input[type='radio'],input[type='checkbox']").forEach((elem) => {
      elem.checked = defaultCardSettings[elem.value]
    })
    document.querySelector('.difficulty_select__single-value').innerHTML = defaultCardSettings.level
    document.querySelectorAll('.rangeInput').forEach((e) => {
      e.value = defaultCardSettings[e.id]
    })
    document.querySelectorAll('.rangeSlider').forEach((e) => {
      e.value = defaultCardSettings[e.id]
    })
  }

  return (
    <div className='settingsModalWrapper'>
      <div className='settingsWrapper'>
        <section className='appSettingsWrapper'>
          <FormWrapper legendText='Application'>
            <SettingsItem type='radio' labelText='learn new words' value='learnNew' onClick={changeRadioSetting} />
            <SettingsItem type='radio' labelText='repeat' value='repeatNew' onClick={changeRadioSetting} />
            <SettingsItem
              type='radio'
              labelText='learn difficult words'
              value='difficultOnly'
              onClick={changeRadioSetting}
            />
            <SettingsItem labelText='auto soundplay' value='autoSoundplay' onClick={changeSetting} />
            <SelectListDifficulty
              localSettings={localSettings}
              onChange={changeSetting}
              setLocalSettings={setLocalSettings}
            />
            <InputSlider
              labelText='amount of new words per day'
              onClick={changeSetting}
              localSettings={localSettings}
              id='amountOfWords'
              setLocalSettings={setLocalSettings}
              value={localSettings.amountOfWords}
            />
            <InputSlider
              labelText='amount of cards per day'
              onClick={changeSetting}
              localSettings={localSettings}
              id='amountOfCards'
              setLocalSettings={setLocalSettings}
              value={localSettings.amountOfCards}
            />
          </FormWrapper>
        </section>

        <section className='cardSettingsWrapper'>
          <FormWrapper legendText='Card'>
            <SettingsItem labelText='show word' value='showWord' onClick={changeSetting} />
            <SettingsItem labelText='show translation' value='showTranslation' onClick={changeSetting} />
            <SettingsItem labelText='show transcription' value='showTranscription' onClick={changeSetting} />
            <SettingsItem labelText='add pronunciation' value='addPronunciation' onClick={changeSetting} />
            <SettingsItem labelText='add illustration' value='addIllustration' onClick={changeSetting} />
            <li className='separatingLine'></li>
            <SettingsItem labelText='show defenition' value='showDefenition' onClick={changeSetting} />
            <SettingsItem
              labelText='add defenition translation'
              value='defenitionTranslation'
              onClick={changeSetting}
            />
            <SettingsItem
              labelText='add defenition pronunciation'
              value='defenitionPronunciation'
              onClick={changeSetting}
            />
            <li className='separatingLine'></li>
            <SettingsItem labelText='show example of usage' value='expampleOfUsage' onClick={changeSetting} />
            <SettingsItem
              labelText='add example of usage translation'
              value='exampleOfUsageTranslation'
              onClick={changeSetting}
            />
            <SettingsItem
              labelText='add example of usage pronunciation'
              value='exampleOfUsagePronunciation'
              onClick={changeSetting}
            />
            <li className='separatingLine'></li>
            <SettingsItem labelText='enable REPEAT button' value='REPEATbutton' onClick={changeSetting} />
            <SettingsItem labelText='enable HARD button' value='HARDbutton' onClick={changeSetting} />
            <SettingsItem labelText='enable SHOW ANSWER button' value='SHOWANSWERbutton' onClick={changeSetting} />
            <SettingsItem labelText='enable EASY button' value='EASYbutton' onClick={changeSetting} />
          </FormWrapper>
        </section>

        <div className='settingsButton_wrapper'>
          <Button children='reset' className='settingsButton--RESET' onClick={resetSettings} />
          <Button children='ok' className='settingsButton--OK' onClick={applySettings} />
        </div>
      </div>
    </div>
  )
}
