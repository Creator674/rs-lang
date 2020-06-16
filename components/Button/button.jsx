import React from 'react'

import './button.less'

export const Button = (props) => {
  const { children, type, ...restProps } = props
  return (
    <button type={type || 'button'} {...restProps}>
      {children}
    </button>
  )
}
