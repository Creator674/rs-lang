import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { getImg } from '../../../lib'

// import Skeleton from '@material-ui/lab/Skeleton'
import Skeleton from '../CardSkeleton/card-skeleton'
import { Footer } from '../CardFooter'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0 3.2rem',
    borderBottom: `0.1rem solid ${theme.palette.common.success}`,
  },
}))

const WordBox = ({ word, image, src }) => {
  const classes = useStyles()
  return (
    <div className={`card-box ${classes.root}`}>
      <div className='word'>{word}</div>
      <img src={src} alt={`Associative image for ${word}`} width='100px' height='100px' />
      <Footer />
    </div>
  )
}

export function Word(props) {
  const [isLoaded, setLoaded] = useState(false)

  useEffect(() => {
    getImg(props.image).then((result) => {
      setLoaded(result)
    })
  }, [])

  return isLoaded ? <WordBox src={isLoaded} {...props} /> : <Skeleton word={props.word} />
}
