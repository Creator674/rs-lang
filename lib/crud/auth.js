import axios from './api'

const API_URL = 'https://afternoon-falls-25894.herokuapp.com'
const DATA_URL = 'https://raw.githubusercontent.com/irinainina/rslang-data/master'

export const getWords = ({ group = 1, page = 1 }) => {
  return axios.get(`${API_URL}/words?group=${group}&page=${page}`)
}

export const getImg = (src) => {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img')
    img.onload = () => {
      resolve(`${DATA_URL}/${src}`)
    }
    img.onerror = () => {
      reject(new Error('unable to get image'))
    }
    img.src = `${DATA_URL}/${src}`
  })
  // return axios.get(`${DATA_URL}/${src}`)
}
