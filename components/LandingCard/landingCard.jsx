import React from 'react'
import Link from 'next/link'
import './landingCard.less'

export const LandingCard = ({ title, imgSrc, gradient, keyWords, link, description }) => {
  return (
    <li className='games__card'>
      <Link href={link}>
        <a href=''>
          <div className='landing-card-wrapper'>
            <div className='game-image'>
              <img src={imgSrc} alt='game-image' />
            </div>
            <div className='bottom' style={{ background: gradient }}>
              <p>{keyWords}</p>
            </div>
            <div className='top'>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          </div>
        </a>
      </Link>
    </li>
  )
}
