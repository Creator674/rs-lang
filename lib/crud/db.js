import Router from 'next/router'
import axios from './api'
import { getLocalStorageProp } from 'lib'

const DB_URL = 'https://afternoon-falls-25894.herokuapp.com'

export const createUser = (name, email, password) => {
  return axios.post(`${DB_URL}/users`, {
    name,
    email,
    password,
  })
}

export const authenticateUser = (email, password) => {
  return axios.post(`${DB_URL}/signin`, {
    email,
    password,
  })
}

// User settings
/**
 * {
 * "wordsPerDay": 0,
 * "optional": {}
 * }
 */

export const saveSettings = (settings) => {
  const { id, token } = getLocalStorageProp('user') || {}
  return axios.put(
    `${DB_URL}/users/${id}/settings`,
    {
      optional: {
        settings: {
          isHuman: true,
        },
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}

export const getSettings = () => {
  const { id, token } = getLocalStorageProp('user') || {}
  return axios.get(`${DB_URL}/users/${id}/settings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

// User statistic
/**
 * {
 *   "learnedWords": 0,
 *   "optional": {}
 *  }
 */

export const saveStatistic = (statistic) => {
  const { id, token } = getLocalStorageProp('user') || {}
  return axios.put(
    `${DB_URL}/users/${id}/statistic`,
    {
      optional: statistic,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}

export const getStatistic = () => {
  const { id, token } = getLocalStorageProp('user') || {}
  return axios.get(`${DB_URL}/users/${id}/statistic`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const refreshToken = (id, refresh_token) => {
  return axios.get(`${DB_URL}/users/${id}/tokens`, {
    headers: {
      Authorization: `Bearer ${refresh_token}`,
    },
  })
}

export function redirectUser(ctx, location) {
  if (ctx && ctx.req) {
    ctx.res.writeHead(302, { Location: location })
    ctx.res.end()
  } else {
    Router.push(location)
  }
}

// export const redirect = (target, ctx) => {
//   if (ctx && ctx.res) {
//     ctx.res.writeHead(302, { Location: target })
//     ctx.res.end()
//   } else {
//     Router.push(target)
//   }
// }
