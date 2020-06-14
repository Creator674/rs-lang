import React from 'react'
import Link from 'next/link'

import { Button } from '../components'

import './index.less'

function Home() {
  return (
    <>
      <h1>Main page</h1>
      <Button className='danger' onClick={() => console.log('triggered')}>
        Danger button
      </Button>

      <Link href='/account'>
        <a>Account</a>
      </Link>
    </>
  )
}

export default Home
