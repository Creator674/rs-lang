import React, { useState } from 'react'
import Gravatar from 'react-gravatar'
import { withInfo } from 'components'
import './account.less'

const AccountComponent = ({ name, email, showInfo }) => {
  return (
    <div className='account'>
      <div className='account__container-user'>
      <div className='user-avatar'>Hi,&nbsp;{name}&nbsp;</div>
          <div className="avatar-btn">
            <Gravatar email={email} className='avatar-img'/>
          </div>
      </div>
      <div className='account__name'>
        <p><i className='icon-user-circle-o'></i>{name}</p>
      </div>
      <div className='account__email'>
        <p><i className='icon-mail'></i>{email}</p>
      </div>
      <a
        className='update-avatar'
        href='https://gravatar.com/'
        target='_blank'
      >
        UPDATE AVATAR
      </a>
    </div>
  )
}

export const Account = withInfo(AccountComponent)
