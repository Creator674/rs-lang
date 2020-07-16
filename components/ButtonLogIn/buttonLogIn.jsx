import React from 'react'
import { withModal } from '../HOC/hoc'
import './buttonLogIn.less'

const MyComponent = ({ showModal }) => {
  return (
    <button className='login' onClick={showModal}>
      <span className='login__line'></span>
      <span className='login__round'></span>
      Log&nbsp;in
    </button>
  )
}

export const ButtonLogIn = withModal(MyComponent)
