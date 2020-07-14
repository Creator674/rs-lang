import React, { useContext, useState } from 'react'
import { Context } from 'context'
import { saveSettings, getSettings, saveStatistic, getStatistic, setLocalStorageProp } from 'lib'
import { makeStyles } from '@material-ui/core/styles'
import { AccountButton, Account, Statistics, SettingsModal } from 'components'

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

export const DropdownMenu = ({ closePopover }) => {
  const styles = useStyle()
  const { appSettings, setAppSettings } = useContext(Context)

  const logOut = () => {
    setLocalStorageProp('user', {})
    setAppSettings({ ...appSettings, isAuthorized: false })
  }

  const items = ['Settings']
  const list = items.map((item, i) => {
    return (
      <div key={item} className={styles.root} onClick={close}>
        <div className='title' style={{ userSelect: 'none', lineHeight: '3.2rem', margin: '0 auto' }}>
          {item}
        </div>
      </div>
    )
  })

  return (
    <div className={styles.menu}>
      <AccountButton closeParent={closePopover} name='Statistic'>
        <Statistics />
      </AccountButton>
      <AccountButton closeParent={closePopover} name='Settings'>
        <SettingsModal />
      </AccountButton>
      <AccountButton closeParent={closePopover} name='Account'>
        <Account />
      </AccountButton>
      <div className={styles.root} onClick={logOut}>
        <div className='title' style={{ userSelect: 'none', lineHeight: '3.2rem', margin: '0 auto' }}>
          Log out
        </div>
      </div>
    </div>
  )
}
