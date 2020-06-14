import React from 'react'
import Link from 'next/link'

import './index.less'

function Home() {
  return (
    <>
      <h1>Main page</h1>
      <Link href='/account'>
        <a>Account</a>
      </Link>
    </>
  )
}

export default Home
