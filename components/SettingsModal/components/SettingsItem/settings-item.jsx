import React from 'react'

import './settings-item.less'

import { Input } from '../../../Input'

export const SettingsItem = (props) => {

    const { type, labelText, name, checked, className, ...restProps} = props

    return (
        <li className="settingsItem">
            <Input
                type={type || "checkbox"}
                name={name}
                checked={checked}
                className={className}
                {...restProps}
            >
            </Input>

            <label
                htmlFor={name}
                className="settings_label">
                {labelText}
            </label>
        </li>
    )
}
