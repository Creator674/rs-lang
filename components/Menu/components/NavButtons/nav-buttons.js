import React, { useContext } from 'react'
import Link from 'next/link'
import { Context } from '../../../../context'

function NavButton({ data: { id, type, text, link, icon, isBordered, styling, subClass }, isShown, action }) {
  const { activeMenu, setActiveMenu } = useContext(Context)
  return (
    <li className='nav-item' onClick={() => setActiveMenu(id)}>
      <Link href={link || '/'}>
        <div className='item'>
          <div className={`icon ${styling ? `icon${styling}` : ''} ${activeMenu === id ? 'active' : ''}`}>
            <div className={`image ${styling ? `image${styling}` : ''}`}></div>
          </div>
          <div
            className={`tooltip ${styling ? `tooltip${styling}` : ''}`}
            dangerouslySetInnerHTML={{ __html: text.replace(/\s/, '&nbsp;') }}
          />
          <div
            className={`sub-menu ${subClass ? subClass : ''} ${type === 'dictionary' ? 'sub-menu__small' : ''} ${
              isShown ? 'show' : ''
            } ${isBordered ? 'sub-menu__bordered' : ''} ${activeMenu === id ? 'active' : ''}`}
          >
            <a className='link' dangerouslySetInnerHTML={{ __html: text.replace(/\s/, '&nbsp;') }} />
          </div>
        </div>
      </Link>
    </li>
  )
}

export const NavButtons = (props) => {
  const { data } = props

  const buttons = data.map((item) => {
    return <NavButton key={item.text} {...props} data={item} />
  })
  return <ul className='nav'>{buttons}</ul>
}
