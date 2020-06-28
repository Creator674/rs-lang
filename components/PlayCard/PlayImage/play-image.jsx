import React, { useState, useEffect, useRef } from 'react'
import Skeleton from '@material-ui/lab/Skeleton'
import { getImg } from 'lib/crud/'

export function PlayImage({ src }) {
  const [isLoaded, setLoaded] = useState(false)

  const source = useRef()
  useEffect(() => {
    getImg(src).then((url) => {
      setInterval(() => {
        source.current = url
        setLoaded(true)
      }, 5000)
    })
  }, [])
  return (
    <div>
      {(isLoaded && <img src={source.current}></img>) || (
        <Skeleton animation='wave' variant='rect' width={'150px'} height={'100px'} />
      )}
    </div>
  )
}
