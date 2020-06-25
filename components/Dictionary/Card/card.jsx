import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { getImg } from '../../../lib'

// import Skeleton from '@material-ui/lab/Skeleton'
import Skeleton from '../CardSkeleton/card-skeleton'
import { Footer } from '../CardFooter'
import { CardText } from '../CardText'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0 3.2rem',
    borderBottom: `0.1rem solid ${theme.palette.common.success}`,
  },
  styleDictionary: {
    padding: '1.6rem 0',
    '& p.sentence': {
      fontFamily: theme.props.secondFont,
      fontSize: '1.2rem',
      lineHeight: '1.6rem',
      marginBottom: '0.4rem',
      '& b': {
        fontWeight: 'bold',
        color: theme.palette.common.success,
      },
      '& i': {
        fontStyle: 'italic',
        color: theme.palette.common.success,
      },
    },
    '& p.translation': {
      fontSize: '1.2rem',
      lineHeight: '1.4rem',
      color: theme.palette.common.textAdd,
    },
  },
}))

const WordBox = ({ word, image, src, ...restProps }) => {
  const classes = useStyles()
  return (
    <div className={`card-box ${classes.root}`}>
      <div className='word'>{word}</div>
      <img src={src} alt={`Associative image for ${word}`} width='100px' height='100px' />
      <CardText outerStyles={classes.styleDictionary} index='textExample' word={restProps} />
      <CardText outerStyles={classes.styleDictionary} index='textMeaning' word={restProps} />
      <Footer />
    </div>
  )
}

export function Card(props) {
  const [isLoaded, setLoaded] = useState(false)

  useEffect(() => {
    getImg(props.image).then((result) => {
      setLoaded(result)
    })
  }, [])

  return isLoaded ? <WordBox src={isLoaded} {...props} /> : <Skeleton word={props.word} />
}
