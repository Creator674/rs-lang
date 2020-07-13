import React, { useState, useEffect } from 'react'
import {Context} from 'context'
import axios from 'lib/crud/api'
import { AppLayout } from 'layouts'
import { Menu, Learn, UserAvatar } from 'components'
import './style.less'

const StartLearn = () => {
  useEffect(() => {

    // axios.get('https://afternoon-falls-25894.herokuapp.com/users')
  });

  return (
    <AppLayout>
      <div className='wrapper-main-page'>
        <Menu />
        <UserAvatar />
        <Learn />
      </div>
    </AppLayout>
  )
}

export default StartLearn