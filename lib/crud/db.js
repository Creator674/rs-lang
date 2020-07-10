import Router from 'next/router'
import axios from './api'
const DB_URL = 'https://afternoon-falls-25894.herokuapp.com'

export const createUser = (name, email, password) => {
  return axios.post(`${DB_URL}/users`, {
    name,
    email,
    password,
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

export const authenticateUser = ({ login, email }) => {}

export const refreshToken = (id, refresh_token) => {
  return axios.get(`${DB_URL}/users/${id}/tokens`, {
    headers: {
      Authorization: `Bearer ${refresh_token}`,
    },
  })
}

// export const redirect = (target, ctx) => {
//   if (ctx && ctx.res) {
//     ctx.res.writeHead(302, { Location: target })
//     ctx.res.end()
//   } else {
//     Router.push(target)
//   }
// }
