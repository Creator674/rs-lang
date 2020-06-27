import React from 'react'

function MainButton({ data: { type, text, link, icon, isBordered }, isShown, action }) {
  return (
    <div className='item item__mobile' onClick={type === 'burger' ? () => action(type) : () => {}}>
      <div className='icon burger'>
        <div className={`image image__burger ${isShown ? 'rotate' : ''}`}></div>
      </div>
      <div
        className={`sub-menu logo ${isShown ? 'show' : ''}`}
        onClick={() => {
          console.log('redirect to...')
        }}
      >
        RS<span className='lang'>Lang</span>
      </div>
    </div>
  )
}

export const MainButtons = (props) => {
  const { data } = props

  const buttons = data.map((item) => <MainButton key={item.text} {...props} data={item} />)
  return <>{buttons}</>
}
