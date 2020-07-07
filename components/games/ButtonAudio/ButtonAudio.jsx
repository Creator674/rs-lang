import React, { useState, useEffect } from 'react' 
import './ButtonAudio.less'
 

export const ButtonAudio = ({ small, getAudioRef, className }) => {
  let isMounted
  const [isActive, setActive] = useState(false)
 
  useEffect(() => {
    isMounted = true
    document.addEventListener('keydown', playSound)
    return () => {
      isMounted = false
      document.removeEventListener('keydown', playSound)
    }
  }, [])

  const playSound = (e) => {
    if (e.keyCode === 32) {
      e.preventDefault()
      if (isActive) return
      setListeners()
    }
  }
  const setListeners = () => {
    !small && getAudioRef().addEventListener('play', toggleActive)
    !small && getAudioRef().addEventListener('ended', removeEvents)
    getAudioRef().play()
  }
  const toggleActive = (e) => {
    if (isMounted === false) return
    setActive(true)
  }
  const removeEvents = (e) => {
    if (isMounted === false) return
    setActive(false)
    !small && getAudioRef().removeEventListener('play', toggleActive)
    !small && getAudioRef().removeEventListener('ended', removeEvents)
  }
  return (
    <span
      className={`button-audio tap audio ${className || 'block'} ${isActive ? 'active' : ''}`}
      onClick={setListeners}
    />
  )
} 