import React, { useEffect, useContext } from 'react'
import { Context } from 'context'
import 'reset-css'
import '../styles/main.less'

import AOS from 'aos'
import 'aos/dist/aos.css'

export const AppLayout = ({ children }) => {
  const {
    appSettings: { isAuthorized },
  } = useContext(Context)

  useEffect(() => {
    AOS.init()
    if (!isAuthorized) console.log("User didn't authorized")
  })

  return <>{children}</>
}
