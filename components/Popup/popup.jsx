import React, { useEffect } from 'react'

import './popup.less'

export const Popup = (props) => {
  const { children, toggleClose, className } = props

  useEffect(() => {
    document.addEventListener('keydown', closeModal)
    return () => {
      document.removeEventListener('keydown', closeModal)
    }
  }, [])

  const closeModal = (e) => {
    if (e.target.classList.contains('overlay')) {
      toggleClose()
    } else if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {
      toggleClose()
    }
  }

  return (
    <div className='overlay' onMouseDown={closeModal}>
      <div className={`modal ${className}`} data-aos='fade-up' data-aos-delay='300'>
        {children}
      </div>
    </div>
  )
}
