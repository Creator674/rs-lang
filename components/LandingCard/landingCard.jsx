import React from 'react';
import './landingCard.less'

export const LandingCard = (props) => {
  
  return (
    <div className='landing-card-wrapper'>
      <div className='game-image'>
        <img src={props.imgSrc} alt='game-image'/>
      </div>
      <div className='bottom' style={{background: props.gradient}}>
        <p>{props.keyWords}</p>
      </div>
      <div className='top'>
        <h3>{props.title}</h3>
        <p>{props.description}</p>
      </div>
    </div>
  )
}