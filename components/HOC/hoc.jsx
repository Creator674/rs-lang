import React, { useState, useRef } from 'react'
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
    const lastType = useRef()

    const updateState = ({ message, type }) => {
      lastType.current = type
      setInfo({ message, type })
    }

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return
      }
      setInfo({ ...info, message: false })
    }
    return (
      <>
        <WrappedComponent {...props} showInfo={updateState} closeInfo={handleClose} />
        <Snackbar open={info.message === false ? false : true} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={lastType.current}>
            {info.message}
          </Alert>
        </Snackbar>
      </>
    )
  }
  return NewComponent
}

export const withModal = (WrappedComponent) => {
  const NewComponent = ({ closeParent, ...props }) => {
    const [showModal, toggleModal] = useState(false)
    const updateChildrenWithProps = React.Children.map(props.children, (child, i) => {
      return React.cloneElement(child, {
        closeModal: () => toggleModal(null),
      })
    })

    return (
      <>
        <WrappedComponent {...props} showModal={() => toggleModal(true)} />
        {showModal && (
          <Popup
            toggleClose={() => {
              toggleModal(null)
              closeParent && closeParent()
            }}
          >
            <div className='register-form'>{updateChildrenWithProps}</div>
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
