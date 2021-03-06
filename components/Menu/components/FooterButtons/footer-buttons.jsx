import React, { useContext } from 'react'

import { Context } from 'context'

function FooterButton({ data: { type, text, link, icon, isBordered, subClass }, isShown }) {
  const { isAudioOn, setAudio, cardSettings, setCardSettings } = useContext(Context)
  const { cardSettings: {isGlobalSound} } = useContext(Context)

  const switchSound = () => {
    setCardSettings({...cardSettings, isGlobalSound: !isGlobalSound})
  }
  return (
    <div className='item' onClick={() => setAudio(!isAudioOn)}>
      <div className='icon icon__audio'>
        {isGlobalSound ? (
          <i className='icon-volume image image__audio' onClick={switchSound}></i>
        ) : (
          <i className='icon-volume-off image image__audio' onClick={switchSound}></i>
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
