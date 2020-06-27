import React, { useContext } from 'react'

import { Context } from 'context'

function FooterButton({ data: { type, text, link, icon, isBordered, subClass }, isShown }) {
  const { isAudioOn, setAudio } = useContext(Context)
  return (
    <div className='item' onClick={() => setAudio(!isAudioOn)}>
      <div className='icon icon__audio'>
        {isAudioOn ? (
          <i className='icon-volume image image__audio'></i>
        ) : (
          <i className='icon-volume-off image image__audio'></i>
        )}
      </div>
      <div className='tooltip' dangerouslySetInnerHTML={{ __html: text.replace(/\s/g, '&nbsp;') }} />
      <div
        className={`sub-menu sub-menu__small ${subClass ? subClass : ''} ${isShown ? 'show' : ''} ${
          isBordered ? 'sub-menu__bordered' : ''
        }`}
        dangerouslySetInnerHTML={{ __html: text.replace(/\s/g, '&nbsp;') }}
      />
    </div>
  )
}

export const FooterButtons = (props) => {
  const { data } = props

  const buttons = data.map((item) => <FooterButton key={item.text} {...props} data={item} />)
  return <>{buttons}</>
}
