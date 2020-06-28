import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyle = makeStyles((theme) => ({
  root: {
    fontFamily: theme.props.mainFont,
    borderTop: theme.borders.borderTop,
  },
}))

function StringParsed({ string, children }) {
  const [, part1, , part2, part3] = string.match(/(.*)<(.*)>(.*)<\/\2>(.*)/)
  return (
    <>
      {part1}
      {children}
      {part3}
    </>
  )
}

export const CardText = ({ word, index, outerStyles, children }) => {
  const translateKey = `${index}Translate`
  const classes = useStyle()
  console.log(word[index].match(/<.*>/))
  return (
    <div className={`${classes.root} ${outerStyles}`}>
      {!children ? (
        <p className='sentence' dangerouslySetInnerHTML={{ __html: word[index] }} />
      ) : (
        <p className='sentence'>
          <StringParsed string={word[index]}>{children}</StringParsed>
        </p>
      )}
      <p className='translation' dangerouslySetInnerHTML={{ __html: word[translateKey] }} />
    </div>
  )
}
