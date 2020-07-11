import React, { useState, useContext, useEffect } from 'react'
import axios from 'lib/crud/api'
import Link from 'next/link'
import { AppLayout } from 'layouts'

import { refreshToken } from 'lib'

import { ProgressBar, ProgressChart } from 'components/Progress'
import { Menu, Learn, UserAvatar } from 'components'
// import { Audiocall } from 'components/games'
import { Button, Popup, SignIn, SignUp, PlayCard } from 'components'
import './style.less'

function Home() {
  const [showSignUp, toggleSignUp] = useState(false)
  const [showSignIn, toggleSignIn] = useState(false)

  const [testValue, setTestValue] = useState(0)

  useEffect(() => {
    // axios.get('https://afternoon-falls-25894.herokuapp.com/users')
  })
  return (
    <AppLayout>
      <div className='wrapper-main-page'>
        <Menu />
        <UserAvatar />
        <Learn />
      </div>

      <ProgressBar current={36} total={50} width='60%' />
      <ProgressChart value={testValue} width='48px' />

      <input
        type='text'
        value={testValue}
        onChange={({ target: { value } }) => {
          setTestValue(+value || 0)
        }}
      />
      <h1>Main page</h1>
      <Button className='danger' onClick={() => console.log('triggered')}>
        Danger button
      </Button>
      <Button className='default' onClick={() => toggleSignUp(!showSignUp)}>
        Sign Up
      </Button>
      <Button className='log-in' onClick={() => toggleSignIn(!showSignIn)}>
        <div></div>
      </Button>
      {showSignUp ? (
        <Popup toggleClose={() => toggleSignUp(false)}>
          <div className='register-form'>
            <SignUp />
          </div>
        </Popup>
      ) : showSignIn ? (
        <Popup toggleClose={() => toggleSignIn(false)}>
          <div className='register-form'>
            <SignIn />
          </div>
        </Popup>
      ) : null}
      <Link href='/account'>
        <a>Account</a>
      </Link>
    </AppLayout>
  )
}

export default Home
