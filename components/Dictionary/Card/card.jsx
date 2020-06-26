import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { getImg } from '../../../lib'

import { Word } from '../Word'
import { CardText } from '../CardText'
import { Footer } from '../CardFooter'

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

const WordBox = ({ word, image, src, isLoaded, ...restProps }) => {
  const classes = useStyles()
  return (
    <div className={`card-box ${classes.root}`}>
      <Word {...{ src, word, ...restProps, isLoaded }} />
      <CardText outerStyles={classes.styleDictionary} index='textExample' word={restProps} />
      <CardText outerStyles={classes.styleDictionary} index='textMeaning' word={restProps} />
      <Footer />
    </div>
  )
}

export function Card(props) {
  const [isLoaded, setLoaded] = useState(false)
  const [src, setSrc] = useState(null)

  let isMounted = false
  useEffect(() => {
    isMounted = true
    getImg(props.image).then((result) => {
      if (isMounted) {
        setLoaded(true)
        setSrc(result)
      }
    })
    return () => {
      isMounted = false
    }
  }, [])

  return <WordBox isLoaded={isLoaded} src={src} {...props} />
}
