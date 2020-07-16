import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { withModal } from 'components'

const useStyle = makeStyles((theme) => ({
  root: {
    width: '9.6rem',
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

const AccountButtonComponent = ({ showModal, name }) => {
  const styles = useStyle()
  return (
    <div className={styles.root} onClick={showModal}>
      <div className='title' style={{ userSelect: 'none', lineHeight: '3.2rem', margin: '0 auto' }}>
        {name}
      </div>
    </div>
  )
}

export const AccountButton = withModal(AccountButtonComponent)
