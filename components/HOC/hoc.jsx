import React, { useState } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { Popup } from 'components'

// error, warning, info, success
function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

export const withInfo = (WrappedComponent) => {
  const NewComponent = (props) => {
    const [info, setInfo] = useState({ message: false, type: null })

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return
      }
      setInfo({ ...info, message: false })
    }

    return (
      <>
        <WrappedComponent {...props} showInfo={setInfo} />
        <Snackbar open={info.message === false ? false : true} autoHideDuration={5000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={info.type}>
            {info.message}
          </Alert>
        </Snackbar>
      </>
    )
  }
  return NewComponent
}

export const withModal = (WrappedComponent) => {
  const NewComponent = (props) => {
    const [showModal, toggleModal] = useState(false)

    return (
      <>
        <WrappedComponent showModal={() => toggleModal(true)} />
        {showModal && (
          <Popup toggleClose={() => toggleModal(null)}>
            <div className='register-form'>{props.children}</div>
          </Popup>
        )}
      </>
    )
  }

  return NewComponent
}

export const withSwitcher = (FirstComponent, SecondComponent) => {
  const NewComponent = (props) => {
    const [isRender, setRender] = useState(true)

    return (
      <>
        {isRender ? (
          <FirstComponent {...props} switchRender={() => setRender(false)} />
        ) : (
          <SecondComponent {...props} />
        )}
      </>
    )
  }

  return NewComponent
}
