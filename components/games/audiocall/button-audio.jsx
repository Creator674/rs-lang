import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyle = makeStyles((theme) => ({
  root: {
    '&:before': {
      content: '""',
      position: 'absolute',
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      opacity: 0,
      left: 0,
      background: 'rgba(255,255,255,.3)',
    },
  },
  active: {
    '&:before': {
      animation: 'animate-audio 2s ease infinite',
    },
  },
}))

export const ButtonAudio = ({ small, getAudioRef, className }) => {
  let isMounted
  const [isActive, setActive] = useState(false)

  const styles = useStyle()
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
      className={`tap audio ${className || 'block'} ${styles.root} ${isActive ? styles.active : ''}`}
      onClick={setListeners}
    />
  )
}
