import React, { useState, useContext } from 'react';
import { Context } from 'context';
import {
  createUser,
  authenticateUser,
  setLocalStorageProp,
  getStatistic,
} from 'lib';

import { withInfo, withSwitcher } from '../HOC/hoc';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { PasswordField } from '../PasswordField';
import { Button } from '../Button';

import './forms.less';

const PATTERN = `^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\+\\-_@$!%*?&#.,;:\\[\\]{}]).{8,}$`;
const RegEx = new RegExp(PATTERN, 'g');

const SignUpForm = ({ className, showInfo, closeInfo, toggleClose }) => {
  const {
    appSettings: { userID, userName },
    setAppSettings,
    userData,
    setUserData,
  } = useContext(Context);
  const { appSettings } = useContext(Context);

  const [ isLoading, setLoading ] = useState(false);
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        // email: 'japost1111@wp.pl',
        // password: 'Qq12345&1111',
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().max(8, 'Max 8 characters name length is allowed'),
        email: Yup.string().email('Email is invalid').required('Is required'),
        password: Yup.string()
          .min(8, 'Must be at least 8 characters')
          .matches(
            RegEx,
            'Must contain lowercase/uppercase letters, numbers and special characters'
          )
          .required('Is required'),
      })}
      onSubmit={({ name, email, password }) => {
        showInfo({ message: 'Sending request. Wait...', type: 'info' });
        createUser(name, email, password)
          .then((response) => {
            showInfo({
              message: 'Created new user. Authorizing...',
              type: 'success',
            });
            // authenticateUser(email, password)
            //   .then((response) => {
            //     toggleClose()
            //     console.log(response)

            //     setLoading(false)
            //   })
            //   .catch((err) => {
            //     showInfo({ message: err.response ? err.response.data : err.message, type: 'error' })
            //   })
            console.log(response.data.id);
          })
          .catch((err) => {
            showInfo({ message: err.response.data, type: 'error' });
          });
        if (isLoading) return;
        setLoading(true);
      }}
    >
      {({ errors, status, touched }) => (
        <Form className={`action-form ${className}`}>
          <div>{status}</div>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <Field name='name' type='text' className='form-control' />
            <div className='error-container'>
              <ErrorMessage
                name='name'
                component='div'
                className='invalid-feedback'
              />
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='email'>
              Email<span className='required'>*</span>
            </label>
            <Field
              name='email'
              type='text'
              className={
                'form-control' +
                (
                  errors.email && touched.email ? ' is-invalid' :
                  '')
              }
              disabled={isLoading}
            />
            <div className='error-container'>
              <ErrorMessage
                name='email'
                component='div'
                className='invalid-feedback'
              />
            </div>
          </div>
          <div className='form-group'>
            <PasswordField disabled={isLoading} />
          </div>
          <div className='form-group'>
            <Button
              type='submit'
              className='btn btn-primary mr-2'
              disabled={isLoading}
            >
              Start Learning
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const SignInForm = ({
  className,
  switchRender,
  showInfo,
  closeInfo,
  closeModal,
}) => {
  const {
    appSettings: { userID, userName },
    setAppSettings,
    userData,
    setUserData,
    appStatistics,
    setAppStatistics,
  } = useContext(Context);
  const { appSettings } = useContext(Context);
  const [ isLoading, setLoading ] = useState(false);
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        // email: 'japost1111@wp.pl',
        // password: 'Qq12345&1111',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Email is invalid').required('Is required'),
        password: Yup.string().required('Is required'),
      })}
      onSubmit={({ email, password }) => {
        showInfo({ message: 'Wait please...', type: 'info' });
        if (isLoading) return;
        authenticateUser(email, password)
          .then((response) => {
            console.log(response);
            closeModal();
            setLocalStorageProp('user', {
              refreshToken: response.data.refreshToken,
              token: response.data.token,
              id: response.data.userId,
            });
            setAppSettings({ ...appSettings, isAuthorized: true });
            setUserData({ ...userData, name: response.data.name });
            getStatistic()
              .then((res) => {
                console.log(res);
                setAppStatistics({ ...appStatistics, ...res.data.optional });
              })
              .catch((err) => {});
          })
          .catch((err) => {
            showInfo({
              message:
                err.response ? err.response.data :
                err.message,
              type: 'error',
            });
          });
        setLoading(true);
      }}
    >
      {({ errors, status, touched }) => (
        <Form className={`action-form-login ${className}`}>
          <div>{status}</div>
          <div className='form-group'>
            <label htmlFor='email'>
              Email<span className='required'>*</span>
            </label>
            <Field
              name='email'
              type='text'
              className={
                'form-control' +
                (
                  errors.email && touched.email ? ' is-invalid' :
                  '')
              }
              disabled={isLoading}
            />
            <div className='error-container'>
              <ErrorMessage
                name='email'
                component='div'
                className='invalid-feedback'
              />
            </div>
          </div>
          <div className='form-group'>
            <PasswordField disabled={isLoading} />
          </div>
          <div className='form-group'>
            <Button
              type='submit'
              className='btn btn-primary mr-2'
              disabled={isLoading}
            >
              Log in
            </Button>
          </div>
          <div className='form-group'>
            <span style={{ fontSize: '1.6rem', padding: '2rem 0 0 0' }}>
              Don't have an account yet?{' '}
              <b
                style={{ cursor: 'pointer', color: 'blue' }}
                onClick={() => switchRender()}
              >
                Create account
              </b>
            </span>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export const SignUp = withInfo(SignUpForm);
export const SignIn = withInfo(SignInForm);
export const SignInSignUpSwitcher = withSwitcher(SignIn, SignUp);
