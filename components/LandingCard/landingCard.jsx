import React from 'react'
import Link from 'next/link'
import './landingCard.less'

export const LandingCard = ({ title, imgSrc, gradient, keyWords, link, description }) => {
  return (
    <li className='games__card'>
      <Link href={link}>
        <a href='' className='landing-card__link'>
          <div className='landing-card__wrapper'>
            <div className='landing-card__image'>
              <img src={imgSrc} alt='game-image' />
            </div>
            <div className='landing-card__bottom' style={{ background: gradient }}>
              <p>{keyWords}</p>
            </div>
            <div className='landing-card__top'>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          </div>
        </a>
      </Link>
    </li>
  )
}
