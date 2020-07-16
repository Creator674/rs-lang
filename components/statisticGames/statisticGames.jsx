import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import './statisticGames.less'

export const StatisticGames = ({ allGuessed, allnotGuessed }) => {
  const [ishidden, setHidden] = useState(false)

  const audioPlay = (src) => {
    const audio = new Audio()
    audio.src = src
    audio.play()
  }

  const returnToLearnPage = () => {
    setHidden((hidden) => !hidden)
  }

  return (
    <div className={ishidden ? 'results_pop hidden' : 'results_pop '}>
      <div className='results_block'>
        <h2>The End</h2>
        <h4>errors</h4>
        <span className='err'>{allnotGuessed && allnotGuessed.length}</span>
        <div className='errors_count'>
          {allnotGuessed
            ? allnotGuessed.map((el, ind) => (
                <div key={el + ind} className='item_result'>
                  {el.hasOwnProperty('audio') ? (
                    <span className='icon_audio'>
                      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' onClick={() => audioPlay(el.audio)}>
                        <path
                          fill='currentColor'
                          d='M15.788 13.007a3 3 0 110 5.985c.571 3.312 2.064 5.675 3.815 5.675 2.244 0 4.064-3.88 4.064-8.667 0-4.786-1.82-8.667-4.064-8.667-1.751 0-3.244 2.363-3.815 5.674zM19 26c-3.314 0-12-4.144-12-10S15.686 6 19 6s6 4.477 6 10-2.686 10-6 10z'
                          fillRule='evenodd'
                        ></path>
                      </svg>
                    </span>
                  ) : (
                    ''
                  )}
                  {Object.entries(el).map((descr, ind) => {
                    let p
                    if (descr[0] !== 'audio' && descr[0] !== 'id') {
                      p = <p key={descr[1]+ind}>{descr[1]}</p>
                    }
                    return p
                  })}
                </div>
              ))
            : ''}
        </div>

        <h4 className='successes'>success</h4>
        <span className='succ'>{allGuessed && allGuessed.length}</span>
        <div className='success_count'>
          {allGuessed
            ? allGuessed.map((el, ind) => (
                <div key={el + ind} className='item_result'>
                  {el.hasOwnProperty('audio') ? (
                    <span className='icon_audio'>
                      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' onClick={() => audioPlay(el.audio)}>
                        <path
                          fill='currentColor'
                          d='M15.788 13.007a3 3 0 110 5.985c.571 3.312 2.064 5.675 3.815 5.675 2.244 0 4.064-3.88 4.064-8.667 0-4.786-1.82-8.667-4.064-8.667-1.751 0-3.244 2.363-3.815 5.674zM19 26c-3.314 0-12-4.144-12-10S15.686 6 19 6s6 4.477 6 10-2.686 10-6 10z'
                          fillRule='evenodd'
                        ></path>
                      </svg>
                    </span>
                  ) : (
                    ''
                  )}
                  {Object.entries(el).map((descr, ind) => {
                    let p
                    if (descr[0] !== 'audio' && descr[0] !== 'id') {
                      p = <p key={descr[1]+ind}>{descr[1]}</p>
                    }
                    return p
                  })}
                </div>
              ))
            : ''}
        </div>
        <div className='result_btns'>
          <Link href={'/learn'}>
            <button className='btn result_return' onClick={() => returnToLearnPage()}>
              Return
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
