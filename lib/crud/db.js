import Router from 'next/router'
import axios from './api'
import { getLocalStorageProp } from 'lib'

const DB_URL = 'https://afternoon-falls-25894.herokuapp.com'

export const isAuthenticated = ( id, token ) => {
  if ( !id || !token ) return false
  return axios.get( `${DB_URL}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  } )
}

export const createUser = ( name, email, password ) => {
  return axios.post( `${DB_URL}/users`, {
    name,
    email,
    password,
  } )
}

export const authenticateUser = ( email, password ) => {
  return axios.post( `${DB_URL}/signin`, {
    email,
    password,
  } )
}

// User settings
/**
 * {
 * "wordsPerDay": 0,
 * "optional": {}
 * }
 */

export const saveSettings = ( settings ) => {
  const { id, token } = getLocalStorageProp( 'user' ) || {}
  return axios.put(
    `${DB_URL}/users/${id}/settings`,
    {
      optional: settings,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}

export const getSettings = () => {
  const { id, token } = getLocalStorageProp( 'user' ) || {}
  if ( !id || !token ) return false
  return new Promise( ( resolve ) => {
    axios.get( `${DB_URL}/users/${id}/settings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    } ).then( response => resolve( response ) ).catch( () => resolve( {} ) )
  } )
}

// User statistic
/**
 * {
 *   "learnedWords": 0,
 *   "optional": {}
 *  }
 */


export const saveStatistic = ( statistics ) => {
  const { id, token } = getLocalStorageProp( 'user' ) || {}
  return axios.put(
    `${DB_URL}/users/${id}/statistics`,
    {
      optional: statistics,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}

export const getStatistic = () => {
  const { id, token } = getLocalStorageProp( 'user' ) || {}
  if ( !id || !token ) return false
  return new Promise( ( resolve ) => {
    axios.get( `${DB_URL}/users/${id}/statistics`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    } ).then( response => resolve( response ) ).catch( () => resolve( { optional: {} } ) )
  } )
}

export const refreshToken = ( id, refresh_token ) => {
  return axios.get( `${DB_URL}/users/${id}/tokens`, {
    headers: {
      Authorization: `Bearer ${refresh_token}`,
    },
  } )
}


// User words

export const getAllUserWords = () => {
  const { id, token } = getLocalStorageProp( 'user' ) || {}
  return axios.get( `${DB_URL}/users/${id}/words`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  } )
}


export const fetchWordsFromDB = ( level, page ) => {
  return axios.get( `${DB_URL}/words?group=${level}&page=${page}` )
}

export const aggregatedWords = ( group, wordsPerPage ) => {
  const { id, token } = getLocalStorageProp( 'user' ) || {}
  return axios.get( `${DB_URL}/users/${id}/aggregatedWords?group=${group}&wordsPerPage=${wordsPerPage}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  } )
}

export const preFetchWords = ( amountOfCards, group ) => {
  return new Promise( ( resolve ) => {
    let needToFetch = 0
    let wordsArray = []
    getAllUserWords().then( response => {
      // все слова по времени на повтор и потом - от кол-ва всего карточек отнять кол-во новых слов
      wordsArray = response.data.filter( word => word.optional.group === group )
      needToFetch = amountOfCards > wordsArray.length ? amountOfCards - wordsArray.length : 0
      if ( !needToFetch ) resolve( wordsArray )
      else {
        aggregatedWords( group, wordsArray.length + needToFetch ).then( response => {
          const combinedWords = [...wordsArray, ...response.data[0].paginatedResults.slice( wordsArray.length )]
          resolve( combinedWords )
        } )
      }
    } )
  } )
}

export const getRepetitionTime = ( learnIndex ) => {
  // const ms = 1000
  // const sec = 60 * ms
  // const min = 60 * sec
  // const hrs = 60 * min
  // const day = 24 * hrs

  switch ( learnIndex ) {
    case 0: return Date.now() + 10 * 1000
    case 20: return Date.now() + 5 * 60 * 1000
    case 40: return Date.now() + 20 * 60 * 1000
    case 60: return Date.now() + 24 * 60 * 60 * 1000
    case 80: return Date.now() + 7 * 24 * 60 * 60 * 1000
    case 100: return Date.now() + 30 * 24 * 60 * 60 * 1000
  }
}

export const createUserWord = ( word ) => {
  const { id, token } = getLocalStorageProp( 'user' ) || {}
  console.log( 'Word ID', word.id )
  return axios.post( `${DB_URL}/users/${id}/words/${word.id ? word.id : word._id}`, {
    optional: {
      ...word
    }
  },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    } )
}

export const updateUserWord = ( word ) => {
  const opts = word.optional ? word.optional : word
  console.log( 'Opts ID', opts.id )
  const { id, token } = getLocalStorageProp( 'user' ) || {}
  return axios.put( `${DB_URL}/users/${id}/words/${opts.id ? opts.id : opts._id}`, {
    optional: {
      ...opts
    }
  },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    } )
}



// export const getWordImg = () => {
//   const cache = {}
//   return function imgPreload(src) {
//     return new Promise((resolve, reject) => {
//       if (cache[src]) resolve(`${DATA_URL}/${src}`)
//       else {
//         const img = document.createElement('img')
//         img.onload = () => {
//           resolve(`${DATA_URL}/${src}`)
//         }
//         img.onerror = () => {
//           reject(new Error('unable to get image'))
//         }
//         img.src = `${DATA_URL}/${src}`
//       }
//     })
//   }
// }

// export const getWordSound = () => {
//   const cache = {}
//   return function imgPreload(src) {
//     return new Promise((resolve, reject) => {
//       if (cache[src]) resolve(`${DATA_URL}/${src}`)
//       else {
//         const audio = new Audio()
//         audio.src = `${DATA_URL}/${src}`
//         audio.addEventListener('loadeddata', () => resolve(`${DATA_URL}/${src}`))
//         audio.addEventListener('onerror', () => reject(new Error('An error occured while loading sound')))
//       }
//     })
//   }
// }







// Redirect user

export function redirectUser( ctx, location ) {
  if ( ctx && ctx.req ) {
    ctx.res.writeHead( 302, { Location: location } )
    ctx.res.end()
  } else {
    Router.push( location )
  }
}
