import React, { useState, useEffect, useRef, useContext } from 'react'
import { Context } from 'context'
import './style.less'

const attrs = {
  maxLength: 50,
  autoComplete: 'off',
  autoCorrect: 'off',
  autoCapitalize: 'off',
  spellCheck: false,
}

export const PlayGuessField = ({ showTheAnswer, word, setAudioLock, setIsGuessed, isGuessed }) => {
  const { learnProgress, setLearnProgress } = useContext(Context)

  const [value, setValue] = useState('')
  const [answer, setAnswer] = useState(null)
  const [isCorrect, setIsCorrect] = useState(null)

  const input = useRef()
  const inputContainer = useRef()
  let isPressed = false

  const handleKeyDown = (e) => {
    if (!e.key.match(/Tab|Shift|Ctrl|Alt|Esc|Caps/) && isGuessed !== true) {
      // input.current.focus()
      isCorrect === isCorrect && setIsCorrect(null)
    }
    if (isPressed) return
    if (e.keyCode === 13) {
      isPressed = true
      checkResult(e.target.value || input.current.value)
    }
  }
  const handleChange = ({ target: { value } }) => {
    setValue(value)
    setAnswer(null)
    resetStyles()
    !input.current.value && setIsCorrect(null)
  }

  useEffect(() => {
    if(showTheAnswer){
      setIsCorrect(true)
      setAnswer(word)
      setLearnProgress({ ...learnProgress, current: learnProgress.current + 1 })
      // setIsGuessed(true)
    }
  }, [showTheAnswer])

  const checkResult = (result) => {
    if (!value.length) {
      isPressed = false
      return
    }
    result = result.trim().toLowerCase()
    setAudioLock(false)
    setIsCorrect(null)
    if (result.toLowerCase() === word.toLowerCase()) {
      setIsCorrect(true)
      setIsGuessed(true)
      setLearnProgress({ ...learnProgress, current: learnProgress.current + 1 })
    } else {
      setIsGuessed(Date.now())
      let isMatch = false
      word.split('').map((letter, i) => {
        if (letter === result[i]) isMatch = true
      })
      !isMatch && setIsCorrect(false)
    }
    input.current.blur()
    setValue('')
    setAnswer(result.trim())
    isPressed = false
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    isGuessed !== true && input.current.focus()
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  })

  let isMounted = false

  const resetStyles = () => {
    inputContainer.current.classList.remove('fade-out')
    inputContainer.current.classList.remove('change-color-text')
  }

  useEffect(() => {
    isMounted = true

    setTimeout(() => {
      if (!isMounted) return
      if (!input.current.value && isGuessed !== true) {
        inputContainer.current.classList.add('fade-out')
        inputContainer.current.classList.add('change-color-text')

        // setTimeout(() => {
        //   if (!isMounted) return
        //   setValue('')
        //   setAnswer(null)
        // }, 3000)
      }
    }, 500)

    return () => {
      isMounted = false
    }
  }, [isGuessed])

  const initialWord = () => {
    return word.split('').map((letter, i) => {
      return (
        <span key={i} index={i} className='hidden'>
          {letter}
        </span>
      )
    })
  }

  const showAnswer = () => {
    return word.split('').map((letter, i) => {
      return letter === answer[i] ? answer[i] : <del key={i}>{letter}</del>
    })
  }

  return (
    <span className='context-container' onContextMenu={(e) => e.preventDefault()}>
      <span className='context'>
        <span ref={inputContainer} className='input-container' data-word={word}>
          <span className={`background ${isCorrect === true ? 'correct' : isCorrect === false ? 'incorrect' : ''}`}>
            {word.split('').map((letter, i) => {
              return (
                <span key={i} index={i} className='hidden'>
                  {letter}
                </span>
              )
            })}
          </span>
          <span className='word-container'>{!answer ? initialWord() : showAnswer()}</span>
          <input
            ref={input}
            className='answer-input'
            type='text'
            {...attrs}
            value={!showTheAnswer ? value : word}
            onChange={handleChange}
            onFocus={handleChange}
          />
        </span>
      </span>
    </span>
  )
}
