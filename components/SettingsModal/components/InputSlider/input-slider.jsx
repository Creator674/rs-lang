import React, { useState } from 'react'

import './input-slider.less'

export const InputSlider = (props) => {
  const { labelText, localSettings, setLocalSettings, id, value } = props

  const [currValue, setCurrValue] = useState(value)

  const handleNumberChange = (event) => {
    document.querySelectorAll(`#${id}`).forEach((e) => {
      e.value = Number(event.target.value)
    })
    setCurrValue(Number(event.target.value))
    localSettings[id] = Number(event.target.value)
    setLocalSettings(localSettings)
  }

  const handleBlur = () => {
    if (currValue < 5) {
      setCurrValue(5)
    } else if (currValue > 30) {
      setCurrValue(30)
    }
  }

  return (
    <li className='rangeInputSliderWrapper'>
      <input
        className='rangeInput'
        type='number'
        min='5'
        max='30'
        step='1'
        id={id}
        defaultValue={typeof value === 'number' ? currValue : value}
        onChange={handleNumberChange}
        onBlur={handleBlur}
      />

      <div className='rangeSliderWrapper'>
        <input
          className='rangeSlider'
          type='range'
          min='5'
          max='30'
          step='1'
          onChange={handleNumberChange}
          defaultValue={typeof value === 'number' ? currValue : value}
          id={id}
        />
        <label className='sliderText' htmlFor='input-slider'>
          {labelText}
        </label>
      </div>
    </li>
  )
}
