import React, { useContext } from 'react'

import './settings-item.less'

import { Input } from '../../../Input'

import { Context } from 'context'

export const SettingsItem = (props) => {
  const { type, labelText, name, value, ...restProps } = props

  const { cardSettings } = useContext(Context)

  return (
    <li>
      <label htmlFor={name} className='settingsItem_label'>
        <Input
          type={type || 'checkbox'}
          name={name}
          value={value}
          defaultChecked={cardSettings[value]}
          {...restProps}
        ></Input>
        <span className='settings_label__text'>{labelText}</span>
      </label>
    </li>
  )
}
