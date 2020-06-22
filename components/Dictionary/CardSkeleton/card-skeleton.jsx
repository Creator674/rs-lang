import React from 'react'

import Skeleton from '@material-ui/lab/Skeleton'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import './card-skeleton.less'

export function CardSkeleton({ word }) {
  return (
    <>
      <CardContent>
        <div className='flex'>
          <Skeleton
            animation='wave'
            variant='text'
            width={word.length * 16}
            style={{ fontSize: '5rem', marginRight: '4px' }}
          />
          <Skeleton animation='wave' variant='text' width={30} style={{ fontSize: '5rem' }} />
        </div>
        <Skeleton animation='wave' variant='rect' width={118} height={118} />
      </CardContent>
      <CardActions>
        <div>actions</div>
      </CardActions>
    </>
  )
}

export default CardSkeleton
