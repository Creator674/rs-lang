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

export const getWordsAndTranslation = ({ group = 1, page = 1 }) => {
  let words = [];
  return axios.get(`${API_URL}/words?group=${group}&page=${page}`)
  .then((response) => {
      // console.log(response.data); 
      // words.push(Object.fromEntries(response.data.map( el => [el.word, el.wordTranslate] )));
      response.data.forEach( (el) => {
        let word = [];
        word = [el.word, el.wordTranslate];
        words.push(word)
      });
       return words;
  })
  .catch((error) => {
    console.log(error);
  })
 
}


export const getWordsTranslationAudioImg = ({ group = 1, page = 1 }) => {
  let words = [];
  return axios.get(`${API_URL}/words?group=${group}&page=${page}`)
  .then((response) => {
      response.data.forEach( (el) => {
        let word = [];
        word = [el.word, el.wordTranslate, el.audio, el.image];
        words.push(word)
      });
       return words;
  })
  .catch((error) => {
    console.log(error);
  })
}

export const getTranslation = (word) => {
  return axios.get(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200421T085741Z.28c875806d5fd2f2.7b933a17b65378f43f8faa7bde7fa96b897405f1&text=${word}&lang=en-ru`)
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
};