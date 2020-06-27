import React, { useContext } from 'react'

import { Context } from 'context'

function StatisticButton({ data: { type, text, link, icon, isBordered, styling, subClass }, isShown, action }) {
  const { toRepeatWords, newWords } = useContext(Context)
  return (
    <div className='item statistic'>
      <div className={`icon icon_statistic ${styling ? `icon_statistic${styling}` : ''}`}>
        {type === 'counter-new' ? newWords : toRepeatWords}
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

export const StatiscticButtons = (props) => {
  const { data } = props

  const buttons = data.map((item) => <StatisticButton key={item.text} {...props} data={item} />)
  return <>{buttons}</>
}
