import React from 'react'
import { Dictionary } from 'components'
import { NavButton } from '../NavButton'

export const NavButtons = (props) => {
  const { data } = props

  const buttons = data.map((item) => {
    return item.type === 'modal-dictionary' ? (
      <NavButton key={item.text} {...props} data={item}>
        <Dictionary />
      </NavButton>
    ) : (
      <NavButton key={item.text} {...props} data={item} />
    )
  })
  return <ul className='nav'>{buttons}</ul>
}
