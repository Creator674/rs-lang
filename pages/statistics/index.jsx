import React, { useState } from 'react'
import Link from 'next/link'

import { Button, Popup, SignIn, SignUp, Statistics } from '../../components'

import './index.less'

function Home() {
  const [showSignUp, toggleSignUp] = useState(false)
  const [showSignIn, toggleSignIn] = useState(false)

  return (
    <div style={{ maxWidth: '375px' }}>
      <Statistics />
    </div>
  )
}

export default Home
