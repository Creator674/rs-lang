import React, { useState } from 'react'
import { Header } from './components/Header'
import { Gameboard } from './components/gameboard'
import { Footer } from './components/Footer'
import './puzzle.less'

export function Puzzle(props) {
  return (
    <div className='wrapper'>
      <Header {...props} />
      <Gameboard {...props} />
      <Footer {...props} />
    </div>
  )
}