import React, { useState, useEffect, useContext } from 'react'
import { Context } from 'context'
import axios from 'lib/crud/api'
import { AppLayout } from 'layouts'
import { Menu, Learn, UserAvatar, Dictionary } from 'components'
import './style.less'

const StartLearn = () => {
  useEffect( () => {

    // axios.get('https://afternoon-falls-25894.herokuapp.com/users')
  } );
  const { userData: { name, email }, isModal, setModal } = useContext( Context )

  return (
    <AppLayout>
      <div className='wrapper-main-page'>
        <Menu />
        <UserAvatar name={name} email={email} />
        <Learn isOverflow={false} closeParent={() => { setModal( !isModal ) }}>
          <Dictionary />
        </Learn>
      </div>
    </AppLayout>
  )
}

export default StartLearn