import React, { useState } from 'react'
import Link from 'next/link'

import { AppLayout } from '../layouts'
import { Button, Popup } from '../components'

import './index.less'

function Home() {
  const [showPopup, togglePopup] = useState(false)

  return (
    <AppLayout>
      <h1>Main page</h1>
      <Button className='danger' onClick={() => console.log('triggered')}>
        Danger button
      </Button>
      <Button className='default' onClick={() => togglePopup(!showPopup)}>
        Show popup
      </Button>
      {showPopup ? <Popup toggleClose={() => togglePopup(false)}>Some text here</Popup> : null}
      <Link href='/account'>
        <a>Account</a>
      </Link>
    </AppLayout>
  )
}

export default Home
