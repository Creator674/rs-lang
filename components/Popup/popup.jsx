import React from 'react'

import './popup.less'

export const Popup = (props) => {
  const { children, toggleClose } = props
  return (
    <div className='overlay' onClick={toggleClose}>
      <div className='modal' data-aos='fade-up' data-aos-delay='300'>
        {children}
      </div>
    </div>
  )
}
