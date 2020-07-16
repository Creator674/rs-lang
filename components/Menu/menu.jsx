import React, { useState } from 'react'

import { MainButtons, NavButtons, StatiscticButtons, FooterButtons } from './components'
import { data } from './data'

import './styles.less'

export const Menu = () => {
  const [isMenuShown, toggleMenu] = useState(false)
  return (
    <div className={`main-menu sidebar ${isMenuShown ? 'sidebar__mobile' : ''} ${isMenuShown ? 'show' : ''}`}>
      <div className='nav-wrapper'>
        <MainButtons data={data.mainButtons} isShown={isMenuShown} action={() => toggleMenu(!isMenuShown)} />
        <NavButtons data={data.navButtons} isShown={isMenuShown} />
        <StatiscticButtons data={data.statisticButtons} isShown={isMenuShown} />
      </div>
      <FooterButtons data={data.footerButtons} isShown={isMenuShown} />
    </div>
  )
}
