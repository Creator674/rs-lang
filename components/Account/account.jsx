import React, { useState } from 'react'
import { UserAvatar, MuiButton, Upload, withInfo } from 'components'

const AccountComponent = ({ name, email, showInfo }) => {
  const [isImageLoaded, setImage] = useState(false)
  const [isUpload, setUpload] = useState(false)
  return (
    <div className='account'>
      <div className='account__user-avatar'>
        <UserAvatar />
      </div>
      <p className='account__name'>{name}</p>
      <p className='account__email'>{email}</p>
      <div className='account__image-crop'>{}</div>

      <button className='btn-start' onClick={() => setUpload(!isUpload)}>
        UPDATE AVATAR
      </button>
    </div>
  )
}

export const Account = withInfo(AccountComponent)
