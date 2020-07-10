import React from 'react'
import './landingMember.less'

export const LandingMember = ({ position, name, nikname, imgSrc }) => {
  const githubUrl = `https://github.com/${nikname}`
  return (
    <li className='about-us__item'>
      <div className='member'>
        <div className='member__wrapper'>
          <p className='member__position'>{position}</p>
          <h5 className='member__name'>{name}</h5>
        </div>
        <a href={githubUrl} className='member__github'>
          <span className='member__nikname'>{nikname}</span>
          <span className='member__github-icon'>
            <i className="icon-github-circled"></i>
          </span>
        </a>
        <div className="member__picture">
          <img src={imgSrc} alt={name} className='' />
        </div>
      </div>
    </li>
  )
}
