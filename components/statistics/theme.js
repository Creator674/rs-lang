import { createMuiTheme } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'

const theme = createMuiTheme({
  borders: {},
  typography: {
    boxSizing: 'border-box',
    htmlFontSize: 10,
    fontFamily: [
      'Source Sans Pro',
      'Arial',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
})

theme.props.mainFont = 'Source Sans Pro'
theme.props.secondFont = 'Martel'
theme.palette.common.textAdd = '#738891'
theme.palette.common.success = '#055B67'




theme.palette.background.root = '#D3E8ED'
theme.palette.background.selected = '#7ab3cc'
theme.palette.background.selectedHover = '#5f8a9c'
theme.palette.common.colorRoot = '#1F658A'
theme.palette.common.border = '#1F658A'
theme.palette.common.colorSelected = '#2C3E50'



theme.borders.borderTop = `0.1rem solid ${fade(theme.palette.common.textAdd, 0.7)}`

theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.4rem',
  },
}

export default theme