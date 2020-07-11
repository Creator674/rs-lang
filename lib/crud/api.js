import axios from 'axios'

axios.interceptors.request.use(
  function (config) {
    // config.headers.Authorization = `Bearer ${cookies.refresh_token}`
    config.headers.Accept = 'application/json'
    config.headers['Content-Type'] = 'application/json'

    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default axios
