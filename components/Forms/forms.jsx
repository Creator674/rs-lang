import React, { useState } from 'react'

import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import { PasswordField } from '../PasswordField'
import { Button } from '../Button'

import './forms.less'

const PATTERN = `^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\+\\-_@$!%*?&#.,;:\\[\\]{}]).{8,}$`
const RegEx = new RegExp(PATTERN, 'g')

export const SignUp = ({ className }) => {
  const [isLoading, setLoading] = useState(false)
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().min(3, 'Minimum 3 characters required').required('Is required'),
        email: Yup.string().email('Email is invalid').required('Is required'),
        password: Yup.string()
          .min(8, 'Must be at least 8 characters')
          .matches(RegEx, 'Must contain lowercase/uppercase letters, numbers and special characters')
          .required('Is required'),
      })}
      onSubmit={(fields) => {
        if (isLoading) return
        setLoading(true)
      }}
    >
      {({ errors, status, touched }) => (
        <Form className={`action-form ${className}`}>
          <div>{status}</div>
          <div className='form-group'>
            <label htmlFor='name'>
              Name<span className='required'>*</span>
            </label>
            <Field
              name='name'
              type='text'
              className={'form-control' + (errors.email && touched.name ? ' is-invalid' : '')}
              disabled={isLoading}
            />
            <div className='error-container'>
              <ErrorMessage name='name' component='div' className='invalid-feedback' />
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='email'>
              Email<span className='required'>*</span>
            </label>
            <Field
              name='email'
              type='text'
              className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
              disabled={isLoading}
            />
            <div className='error-container'>
              <ErrorMessage name='email' component='div' className='invalid-feedback' />
            </div>
          </div>
          <div className='form-group'>
            <PasswordField disabled={isLoading} />
          </div>
          <div className='form-group'>
            <Button type='submit' className='btn btn-primary mr-2' disabled={isLoading}>
              Sign up
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export const SignIn = ({ className }) => {
  const [isLoading, setLoading] = useState(false)
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Email is invalid').required('Is required'),
        password: Yup.string().required('Is required'),
      })}
      onSubmit={(fields) => {
        if (isLoading) return
        setLoading(true)
      }}
    >
      {({ errors, status, touched }) => (
        <Form className={`action-form ${className}`}>
          <div>{status}</div>
          <div className='form-group'>
            <label htmlFor='email'>
              Email<span className='required'>*</span>
            </label>
            <Field
              name='email'
              type='text'
              className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
              disabled={isLoading}
            />
            <div className='error-container'>
              <ErrorMessage name='email' component='div' className='invalid-feedback' />
            </div>
          </div>
          <div className='form-group'>
            <PasswordField disabled={isLoading} />
          </div>
          <div className='form-group'>
            <Button type='submit' className='btn btn-primary mr-2' disabled={isLoading}>
              Sign in
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
