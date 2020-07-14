import React, { useState } from 'react'

import Select from 'react-select'

import './select-list-difficulty.less'

export const SelectListDifficulty = (props) => {

  const { localSettings, setLocalSettings }  = props

  const [selectedOption, setSelectedOption] = useState({label: localSettings.level, value: localSettings.level})

  const customStyles = {
    option: (provided, state) => ({
      fontSize: 16,
      color: '#1F658A',
      cursor: 'default',
      borderRadius: 4,
      background: state.isFocused ? '#7AB4CC' : 'white',
      cursor: 'pointer',
    }),
    control: () => ({
      display: 'flex',
      height: 22,
      justifyContent: 'center',
      alignItems: 'center',
    }),
    valueContainer: () => ({
      display: 'flex',
      alignItems: 'center',
      width: 100,
      height: 24,
      cursor: 'default',
    }),
    singleValue: () => ({
      marginLeft: 4,
      fontSize: 14,
      color: '#1F658A',
      cursor: 'pointer',
    }),
    menuList: () => ({
      color: 'red',
    }),
    indicatorsContainer: () => ({
      padding: 0,
      cursor: 'pointer',
    }),
    dropdownIndicator: () => ({
      padding: 0,
      cursor: 'pointer',
    }),
    menu: () => ({
      display: 'flex',
      height: 22,
      justifyContent: 'space-around',
      alignItems: 'flex-start',
      width: 132,
      height: 50,
      background: 'white',
      borderRadius: 4,
      margin: '8px auto',
      cursor: 'default',
    }),
  }

  const options = [
    { label: 'level 1', value: 'level1' },
    { label: 'level 2', value: 'level2' },
    { label: 'level 3', value: 'level3' },
    { label: 'level 4', value: 'level4' },
    { label: 'level 5', value: 'level5' },
    { label: 'level 6', value: 'level6' },
  ]
  const changeOption = (e) => {
    setSelectedOption(e)
    localSettings.level = e.value
    setLocalSettings(localSettings)
  }

  return (
    <div className='difficultySelectWrapper'>
      <Select
        className='difficulty_select'
        name='difficulty'
        options={options}
        styles={customStyles}
        classNamePrefix='difficulty_select'
        value={selectedOption}
        instanceId='diff'
        onChange={changeOption}
      />
    </div>
  )
}
