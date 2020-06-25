import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyle = makeStyles((theme) => ({
  root: {
    fontFamily: theme.props.mainFont,
    borderTop: theme.borders.borderTop,
  },
}))

export const CardText = ({ word, index, outerStyles }) => {
  const translateKey = `${index}Translate`
  const classes = useStyle()
  return (
    <div className={`${classes.root} ${outerStyles}`}>
      <p className='sentence' dangerouslySetInnerHTML={{ __html: word[index] }} />
      <p className='translation' dangerouslySetInnerHTML={{ __html: word[translateKey] }} />
    </div>
  )
}
