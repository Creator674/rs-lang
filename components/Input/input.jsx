import React from 'react'

export const Input = (props) => {
    const { type, className, value, name, ...restProps} = props

    return (
        <input
            type={type}
            className={className}
            value={value}
            name={name}
            {...restProps}
        >
        </input>
    )
}
