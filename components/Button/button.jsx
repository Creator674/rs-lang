import React from 'react'

import './button.less'

export const Button = (props) => {
  const { children, ...restProps } = props
  return <button {...restProps}>{children}</button>
}
