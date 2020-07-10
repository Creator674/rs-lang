const DATA_URL = 'https://raw.githubusercontent.com/irinainina/rslang-data/master'

export const getAudio = (src) => {
  return new Promise((resolve, reject) => {
    const audio = new Audio()
    audio.src = `${DATA_URL}/${src}`
    audio.addEventListener('loadeddata', () => resolve(`${DATA_URL}/${src}`))
    audio.addEventListener('error', () => reject(new Error('Audio is not available')))
  })
}
