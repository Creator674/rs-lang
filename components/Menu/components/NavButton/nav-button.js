import React, { useContext } from 'react'
import Link from 'next/link'
import { Context } from 'context'
import { withModal } from '../../../HOC/hoc'

export const NavButton = ( {
  data: { id, type, text, link, icon, isBordered, styling, subClass },
  isShown,
  action,
  showModal,

} ) => {
  const { activeMenu, setActiveMenu, setModal } = useContext( Context )
  return (
    <li className='nav-item' onClick={() => setActiveMenu( id )}>
      {type === 'modal-dictionary' ? (
        <div className='item' onClick={() => setModal( true )}>
          <div className={`icon ${styling ? `icon${styling}` : ''} ${activeMenu === id ? 'active' : ''}`}>
            <div className={`image ${styling ? `image${styling}` : ''}`}>
              <img src={icon} />
            </div>
          </div>
          <div
            className={`tooltip ${styling ? `tooltip${styling}` : ''}`}
            dangerouslySetInnerHTML={{ __html: text.replace( /\s/, '&nbsp;' ) }}
          />
          <div
            className={`sub-menu ${subClass ? subClass : ''} ${type === 'dictionary' ? 'sub-menu__small' : ''} ${
              isShown ? 'show' : ''
              } ${isBordered ? 'sub-menu__bordered' : ''} ${activeMenu === id ? 'active' : ''}`}
          >
            <a className='link' dangerouslySetInnerHTML={{ __html: text.replace( /\s/, '&nbsp;' ) }} />
          </div>
        </div>
      ) : (
          <Link href={link || '/'}>
            <div className='item'>
              <div className={`icon ${styling ? `icon${styling}` : ''} ${activeMenu === id ? 'active' : ''}`}>
                <div className={`image ${styling ? `image${styling}` : ''}`}>
                  <img src={icon} />
                </div>
              </div>
              <div
                className={`tooltip ${styling ? `tooltip${styling}` : ''}`}
                dangerouslySetInnerHTML={{ __html: text.replace( /\s/, '&nbsp;' ) }}
              />
              <div
                className={`sub-menu ${subClass ? subClass : ''} ${
                  type === 'modal-dictionary' ? 'sub-menu__small' : ''
                  } ${isShown ? 'show' : ''} ${isBordered ? 'sub-menu__bordered' : ''} ${
                  activeMenu === id ? 'active' : ''
                  }`}
              >
                <a className='link' dangerouslySetInnerHTML={{ __html: text.replace( /\s/, '&nbsp;' ) }} />
              </div>
            </div>
          </Link>
        )}
    </li>
  )
}

// export const NavButton = withModal(navButtonComponent)
