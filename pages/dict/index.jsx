import React, { useState } from 'react'
import Link from 'next/link'

import { Button, Popup, SignIn, SignUp, Dictionary } from '../../components'

import './index.less'

function Home() {
  const [showSignUp, toggleSignUp] = useState(false)
  const [showSignIn, toggleSignIn] = useState(false)

  return (
    <div style={{ maxWidth: '375px' }}>
      <Dictionary />
    </div>
  )
}

export default Home
