import React, { useEffect } from 'react'

import './popup.less'

export const Popup = ( props ) => {
  const { children, toggleClose, className, isWithOverflow } = props

  useEffect( () => {
    document.addEventListener( 'keydown', closeModal )
    return () => {
      document.removeEventListener( 'keydown', closeModal )
    }
  }, [] )

  const closeModal = ( e ) => {
    if (
      // e.target.classList.contains('overlay') ||
      e.target.classList.contains( 'close-btn' ) ||
      e.target.classList.contains( 'icon-cancel' )
    ) {
      toggleClose()
    } else if ( e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27 ) {
      toggleClose()
    }
  }

  return (
    <div className='overlay' onMouseDown={closeModal}>
      <div className={`modal ${className}`} data-aos='fade-up' data-aos-delay='300' style={{ overflow: isWithOverflow === false ? 'hidden' : 'auto' }}>
        <button className='close-btn' onClick={closeModal}>
          <i className='icon-cancel'></i>
        </button>
        {children}
      </div>
    </div>
  )
}
