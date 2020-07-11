import React, { useState, useContext } from 'react'

import { SettingsItem } from './components/SettingsItem'

import { SelectListDifficulty } from './components/SelectListDifficulty'

import { FormWrapper } from './components/FormWrapper'

import { InputSlider } from './components/InputSlider'

import { Button } from '../Button'

import { Context } from 'context'

import './settings-modal.less'

export const SettingsModal = () => {
  const defaultSettings = {
    learnNew: true,
    repeatNew: true,
    difficultOnly: true,
    autoSoundplay: true,

    showWord: true,
    showTranslation: true,
    showTranscription: true,
    addPronunciation: true,
    addIllustration: true,

    showDefenition: false,
    defenitionTranslation: false,
    defenitionPronunciation: false,

    expampleOfUsage: false,
    exampleOfUsageTranslation: false,
    exampleOfUsagePronunciation: false,

    REPEATbutton: false,
    HARDbutton: false,
    SHOWANSWERbutton: false,
    EASYbutton: false,
  }

  const { setCardSettings, cardSettings } = useContext(Context)

  const [currSettings, setCurrSettings] = useState(Object.assign({}, cardSettings))

  const resetSettings = () => {
    setCardSettings({
      learnNew: false,
      repeatNew: false,
      difficultOnly: false,
      autoSoundplay: false,

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
      HARDbutton: false,
      SHOWANSWERbutton: false,
      EASYbutton: false,
    })
    setCurrSettings({
      learnNew: false,
      repeatNew: false,
      difficultOnly: false,
      autoSoundplay: false,

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
      HARDbutton: false,
      SHOWANSWERbutton: false,
      EASYbutton: false,
    })
    console.log('settings reseted', currSettings)
  }

  const appplySettings = () => {
    setCardSettings(cardSettings)
    setCurrSettings(currSettings)
    console.log('settings applied')
  }

  const changeOption = (e) => {
    currSettings[e.target.value] = !currSettings[e.target.value]
    setCurrSettings(currSettings)
  }

  return (
    <div className='settingsModalWrapper'>
      <div className='settingsWrapper'>
        <section className='appSettingsWrapper'>
          <FormWrapper legendText='Application'>
            <SettingsItem
              type='radio'
              labelText='learn new words'
              value='learnNew'
              onChange={changeOption}
              defaultChecked={currSettings.learnNew}
            />
            <SettingsItem
              type='radio'
              labelText='repeat'
              value='repeatNew'
              onChange={changeOption}
              defaultChecked={currSettings.repeatNew}
            />
            <SettingsItem
              type='radio'
              labelText='learn difficult words'
              value='difficultOnly'
              onChange={changeOption}
              defaultChecked={currSettings.difficultOnly}
            />
            <SettingsItem
              labelText='auto soundplay'
              value='autoSoundplay'
              onChange={changeOption}
              defaultChecked={currSettings.autoSoundplay}
            />
            <SelectListDifficulty />
            <InputSlider labelText='amount of new words per day' />
            <InputSlider labelText='amount of cards per day' />
          </FormWrapper>
        </section>

        <section className='cardSettingsWrapper'>
          <FormWrapper legendText='Card'>
            <SettingsItem
              labelText='show word'
              value='showWord'
              onChange={changeOption}
              defaultChecked={currSettings.showWord}
            />
            <SettingsItem
              labelText='show translation'
              value='showTranslation'
              onChange={changeOption}
              defaultChecked={currSettings.showTranslation}
            />
            <SettingsItem
              labelText='show transcription'
              value='showTranscription'
              onChange={changeOption}
              defaultChecked={currSettings.showTranscription}
            />
            <SettingsItem
              labelText='add pronunciation'
              value='addPronunciation'
              onChange={changeOption}
              defaultChecked={currSettings.addPronunciation}
            />
            <SettingsItem
              labelText='add illustration'
              value='addIllustration'
              onChange={changeOption}
              defaultChecked={currSettings.addIllustration}
            />
            <li className='separatingLine'></li>
            <SettingsItem
              labelText='show defenition'
              value='showDefenition'
              onChange={changeOption}
              defaultChecked={currSettings.showDefenition}
            />
            <SettingsItem
              labelText='add defenition translation'
              value='defenitionTranslation'
              onChange={changeOption}
              defaultChecked={currSettings.defenitionTranslation}
            />
            <SettingsItem
              labelText='add defenition pronunciation'
              value='defenitionPronunciation'
              onChange={changeOption}
              defaultChecked={currSettings.defenitionPronunciation}
            />
            <li className='separatingLine'></li>
            <SettingsItem
              labelText='show example of usage'
              value='expampleOfUsage'
              onChange={changeOption}
              defaultChecked={currSettings.expampleOfUsage}
            />
            <SettingsItem
              labelText='add example of usage translation'
              value='exampleOfUsageTranslation'
              onChange={changeOption}
              defaultChecked={currSettings.exampleOfUsageTranslation}
            />
            <SettingsItem
              labelText='add example of usage pronunciation'
              value='exampleOfUsagePronunciation'
              onChange={changeOption}
              defaultChecked={currSettings.exampleOfUsagePronunciation}
            />
            <li className='separatingLine'></li>
            <SettingsItem
              labelText='enable REPEAT button'
              value='REPEATbutton'
              onChange={changeOption}
              defaultChecked={currSettings.REPEATbutton}
            />
            <SettingsItem
              labelText='enable HARD button'
              value='HARDbutton'
              onChange={changeOption}
              defaultChecked={currSettings.HARDbutton}
            />
            <SettingsItem
              labelText='enable SHOW ANSWER button'
              value='SHOWANSWERbutton'
              onChange={changeOption}
              defaultChecked={currSettings.SHOWANSWERbutton}
            />
            <SettingsItem
              type='checkbox'
              labelText='enable EASY button'
              value='EASYbutton'
              onChange={changeOption}
              defaultChecked={currSettings.EASYbutton}
            />
          </FormWrapper>
        </section>

        <div className='settingsButton_wrapper'>
          <Button children='reset' className='settingsButton--RESET' onClick={resetSettings} />
          <Button children='ok' className='settingsButton--OK' onClick={appplySettings} />
        </div>
      </div>
    </div>
  )
}
