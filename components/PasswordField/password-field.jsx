import React, { useState } from 'react'

import { Button } from '../Button'

import { Field, useFormikContext, ErrorMessage } from 'formik'

export const PasswordField = ({ disabled }) => {
  const [showPassword, toggleShowPassword] = useState(false)
  const { errors, touched } = useFormikContext()

  return (
    <>
      <label htmlFor='password'>
        Password<span className='required'>*</span>
      </label>
      <div className='label-group'>
        <Field
          name='password'
          type={showPassword ? 'text' : 'password'}
          className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')}
          disabled={disabled}
        />
        <Button onClick={() => toggleShowPassword(!showPassword)} disabled={disabled}>
          {showPassword ? <i className='icon-eye'></i> : <i className='icon-eye-off'></i>}
        </Button>
      </div>
      <div className='error-container'>
        <ErrorMessage name='password' component='div' className='invalid-feedback' />
      </div>
    </>
  )
}
