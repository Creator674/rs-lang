import React, { useState } from 'react'

import './input-slider.less'

export const InputSlider = (props) => {

    const { labelText } = props

    const [value, setValue] = useState(5)

    const handleNumberChange = (event) => {
        setValue(event.target.value === '' ? '' : Number(event.target.value))
    }

    const handleBlur = () => {
        if (value < 0) {
            setValue(0)
        } else if (value > 30) {
            setValue(30)
        }
    }

    return (
        <li className="rangeInputSliderWrapper">
            <input
                className="rangeInput"
                type="number"
                min="5"
                max="30"
                step="1"
                value={typeof value === 'number' ? value : 10}
                onChange={handleNumberChange}
                onBlur={handleBlur}
            />

            <div className="rangeSliderWrapper">
                <input
                    className="rangeSlider"
                    type="range"
                    min="5"
                    max="30"
                    step="1"
                    onChange={handleNumberChange}
                    value={typeof value === 'number' ? value : 10}
                    id="input-slider"
                />
                <label className="sliderText" htmlFor="input-slider">{labelText}</label>
            </div>

        </li>
    )
}
