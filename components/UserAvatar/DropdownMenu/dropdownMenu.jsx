import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    cursor: 'pointer',
    borderRadius: '1.4rem',
    lineHeight: '3.6rem',
    padding: '0 1rem',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: 300,
    '&.active, &:hover': {
      background: theme.palette.common.btnMiddle,
      color: theme.palette.common.text,
      fontWeight: 400,
    },
  },
}))

export default function DropdownMenu() {
  const styles = useStyle()
  const items = ['Statistic', 'Settings', 'Account', 'Log out']
  const list = items.map((item, i) => {
    return (
      <div
        key={item}
        className={styles.root}
        onClick={() => {}}
      >
        <div className='title' style={{ userSelect: 'none', lineHeight: '3.2rem' }}>
          {item}
        </div>
      </div>
    )
  })
  return <div className={styles.menu}>{list}</div>
}
