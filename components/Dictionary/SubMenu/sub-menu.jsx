import React, { useContext } from 'react'
import { Context } from '../../../context'
import { makeStyles } from '@material-ui/core/styles'
import { DictionaryContext } from '../../../context'

const useStyle = makeStyles((theme) => ({
  menu: {
    width: '170px',
  },
  root: {
    display: 'flex',
    cursor: 'pointer',
    borderRadius: '1.4rem',
    lineHeight: '3.6rem',
    padding: '0 1rem',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: 300,
    '&.active': {
      background: theme.palette.common.btnMiddle,
      color: theme.palette.common.text,
      fontWeight: 400,
    },
  },
  indicator: {
    lineHeight: '11px',
    display: 'flex',
    flexDirection: 'column',
    '& i.active:before': {
      color: theme.palette.common.addLight,
    },
    '& i:before': {
      color: theme.palette.common.text,
      lineHeight: '0',
    },
  },
}))

const indicator = (direction) => {
  const styles = useStyle()
  return (
    <div className={styles.indicator}>
      <i className={`icon-up-dir ${direction === 'desc' ? 'active' : ''}`}></i>
      <i className={`icon-down-dir ${direction === 'asc' ? 'active' : ''}`}></i>
    </div>
  )
}

function descSort(a, b) {
  if (a.word > b.word) return 1
  if (b.word > a.word) return -1

  return 0
}

function ascSort(a, b) {
  if (a.word > b.word) return -1
  if (b.word > a.word) return 1

  return 0
}

function sort(array, direction, field) {
  switch (direction) {
    case 'asc':
      switch (field) {
        case 0:
          return array.sort(ascSort)
        default:
          return array
      }
    case 'desc':
      switch (field) {
        case 0:
          return array.sort(descSort)
        default:
          return array
      }
    default:
      return array
  }
}

export default function subMenu() {
  const styles = useStyle()
  const {
    words,
    setSort,
    sort: { field, direction },
  } = useContext(Context)
  const { setWords } = useContext(DictionaryContext)
  const items = ['Alphabetically', 'Chronologically', 'Times used']
  const list = items.map((item, i) => {
    return (
      <div
        key={item}
        className={field === i ? `active ${styles.root}` : `${styles.root}`}
        onClick={() => {
          const sorted = sort([...words], direction, i)
          setSort({ field: i, direction: direction === 'desc' ? 'asc' : 'desc' })
          setWords(sorted)
        }}
      >
        <div className='title' style={{ userSelect: 'none', lineHeight: '3.2rem' }}>
          {item}
        </div>
        {field === i ? indicator(direction) : null}
      </div>
    )
  })
  return <div className={styles.menu}>{list}</div>
}
