import React, { useState, useEffect } from 'react'

import { getImg } from '../../../lib'

// import Skeleton from '@material-ui/lab/Skeleton'
import Skeleton from '../CardSkeleton/card-skeleton'

const WordBox = ({ word, image, src }) => {
  return (
    <div className='card'>
      <div className='word'>{word}</div>
      <img src={src} alt={`Associative image for ${word}`} width='100px' height='100px' />
    </div>
  )
}

export function Word(props) {
  const [isLoaded, setLoaded] = useState(false)

  useEffect(() => {
    getImg(props.image).then((result) => {
      setTimeout(() => {
        // setLoaded(result)
      }, 5000)
    })
  }, [])

  return isLoaded ? <WordBox src={isLoaded} {...props} /> : <Skeleton word={props.word} />
}
