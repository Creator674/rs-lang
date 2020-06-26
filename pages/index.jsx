import React, { useState } from 'react'
import Link from 'next/link'
import { AppLayout } from '../layouts'
import { Button, Popup, SignIn, SignUp } from '../components'
import { GameStartModalWindow } from '../components/GameStartModalWindow'
import { MainPageWithCard } from '../components/MainPageWithCard'
import './index.less'

import { ProgressBar, ProgressChart } from '../components/Progress'
import { Audiocall, Puzzle, Speakit, SprintGame, Hangman } from '../components/games'

function Home() {
  const [showSignUp, toggleSignUp] = useState(false)
  const [showSignIn, toggleSignIn] = useState(false)

  const [testValue, setTestValue] = useState(0)
  return (
    <AppLayout>
      {/* <GameStartModalWindow />  */}
      {/* <Audiocall />    */}
      {/* <Puzzle />       */}
      {/* <Speakit />   */}
      <SprintGame />
      {/* <Hangman /> */}
      {/* <MainPageWithCard /> */}

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
        {/* Sign In */}
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
