import React, { useRef, useEffect } from 'react'
import './ButtonsList.less'

export const ButtonsList = ({ list = [], playWord, isResult, handleClick }) => {
  let buttons = null
  let isMounted = false
  const refs = useRef()
  const wrongId = useRef()
  const rightId = useRef()
  refs.current = []

  useEffect(() => {
    wrongId.current = null
    rightId.current = null
  })

  useEffect(() => {
    isMounted = true
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      isMounted = false
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  const handleKeyPress = (e) => {
    if (isMounted) {
      if (e.key.toString().match(/^(1|2|3|4|5)$/)) {
        refs.current[e.key - 1].current.click()
      }
    }
  }
  buttons = list.map((item, i) => {
    const button = useRef()
    refs.current.push(button)
    if (isResult) {
        return (
          <div
            key={item.word + i}
            className={`btn-wrapper ${isResult && 'disabled'} ${
              i === wrongId.current ? 'wrong' : i === rightId.current ? 'success' : ''
            }`}
          >
            <div className='number'>{i + 1}</div>
            <div className='check-mark'></div>
            <button ref={button} className={`${item.id === playWord.id ? 'active' : 'fade-out'} `} data-id={item.id}>
              {item.wordTranslate}
            </button>
          </div>
        )
    } else {
        return (
          <div key={item.word +i} className='btn-wrapper'>
            <div className='number'>{i + 1}</div>
            <button
              ref={button}
              data-id={item.id}
              onClick={(e) => {
                handleClick(e)
                if (item.id !== playWord.id) wrongId.current = i
                if (item.id === playWord.id) rightId.current = i
              }}
            >
              {item.wordTranslate}
            </button>
          </div>
        )
      }
  })

  return <>{buttons}</>
}
