import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyle = makeStyles((theme) => {
  return {
    root: {
      fontFamily: theme.props.mainFont,
      borderTop: theme.borders.borderTop,
      '&.border-top-0': {
        borderTop: 'none',
      },
      '&.second-row p:first-child': {
        lineHeight: '2.4rem',
      },
      '&.second-row p': {
        lineHeight: '2.2rem',
      },
    },
  }
})

function StringParsed({ string, children }) {
  if(string){
    const [, part1, , part2, part3] = string.match(/(.*)<(.*)>(.*)<\/\2>(.*)/)
    return (
      <>
        {part1}
        {children}
        {part3}
      </>
    )
  } else {
    return null
  }
}

export const CardText = ({ word, index, outerStyles, children, className }) => {
  const translateKey = `${index}Translate`
  const classes = useStyle()
  return (
    <div className={`${classes.root} ${outerStyles} ${className}`}>
      {!children ? (
        <p className='sentence' dangerouslySetInnerHTML={{ __html: word[index] }} />
      ) : (
        <p className='sentence'>
          <StringParsed string={word? word[index] : ''}>{children}</StringParsed>
        </p>
      )}
      <p className='translation' dangerouslySetInnerHTML={{ __html: word? word[translateKey] : ''}} />
    </div>
  )
}
