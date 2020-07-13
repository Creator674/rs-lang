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

export const getAudio = (src) => {
  return new Promise((resolve) => {
    const audio = new Audio()
    audio.src = `${DATA_URL}/${src}`
    audio.addEventListener('loadeddata', () => resolve(`${DATA_URL}/${src}`))
  })
  // return axios.get(`${DATA_URL}/${src}`)
}

export const getWordsAndTranslation = ({ group = 1, page = 1 }) => {
  let words = []
  return axios
    .get(`${API_URL}/words?group=${group}&page=${page}`)
    .then((response) => {
      // console.log(response.data);
      // words.push(Object.fromEntries(response.data.map( el => [el.word, el.wordTranslate] )));
      response.data.forEach((el) => {
        let word = []
        word = [el.word, el.wordTranslate, el.id]
        words.push(word)
      })
      return words
    })
    .catch((error) => {
      console.log(error)
    })
}

export const combineWords = ({ group = 1, page = 1 }) => {
  let words = []
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URL}/words?group=${group}&page=${page}`)
      .then((response) => {
        let promises = Promise.resolve()
        response.data.forEach(({ id, word, wordTranslate, audio, image, transcription }) => {
          let imgSrc
          promises = promises
            .then(() => getImg(image))
            .then((url) => {
              imgSrc = url
              return getAudio(audio)
            })
            .then((url) => {
              words.push({
                id,
                word,
                wordTranslate,
                sound: url,
                image: imgSrc,
                transcription,
              })
            })
        })
        promises = promises.then(() => resolve(words))
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const combineWordsForDictionary = ({ group = 1, page = 1 }) => {
  let words = []
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URL}/words?group=${group}&page=${page}`)
      .then((response) => {
        let promises = Promise.resolve()
        response.data.forEach(({ id, word, wordTranslate, audio, audioMeaning, audioExample, image, textMeaning, textExample, textExampleTranslate, textMeaningTranslate }) => {
          let imgSrc
          promises = promises
            .then(() => getImg(image))
            .then((url) => {
              imgSrc = url
              return getAudio(audio)
            })
            .then((url) => {
              imgSrc = url
              return getAudio(audioMeaning)
            })
            .then((url) => {
              imgSrc = url
              return getAudio(audioExample)
            })
            .then((url) => {
              words.push({
                id,
                word,
                wordTranslate,
                sound: url,
                audioMeaning: audioMeaning,
                audioExample: audioExample,
                textMeaning: textMeaning,
                textExample: textExample,
                textExampleTranslate: textExampleTranslate,
                textMeaningTranslate: textMeaningTranslate,
                image: imgSrc, 
              })
            })
        })
        promises = promises.then(() => resolve(words))
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const getWordsAndTranslationAndExamples = ({ group = 1, page = 1 }) => {
  let words = []
  return axios
    .get(`${API_URL}/words?group=${group}&page=${page}`)
    .then((response) => {
      // console.log(response.data);
      // words.push(Object.fromEntries(response.data.map( el => [el.word, el.wordTranslate] )));
      response.data.forEach((el) => {
        let word = []
        word = [el.word, el.wordTranslate, el.textMeaning, el.id]
        words.push(word)
      })
      return words
    })
    .catch((error) => {
      console.log(error)
    })
}

export const dataForPuzzle = ({ group = 1, page = 1 }) => {
  let words = []
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URL}/words?group=${group}&page=${page}`)
      .then((response) => {
        let promises = Promise.resolve()
        response.data.forEach(({ textExample, textExampleTranslate, audioExample, id }) => {
          let audioSrc
          promises = promises
            .then((url) => {
              audioSrc = url
              return getAudio(audioExample)
            })
            .then((url) => {
              words.push({
                text: textExample.replace(/<\/?b>/g, ''),
                textTranslate: textExampleTranslate,
                audio: url,
                id: id,
              })
            })
        })
        promises = promises.then(() => resolve(words))
      })
      .catch((error) => {
        reject(error)
      })
  })
}
