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

theme.palette.common.main = '#1F658A'
theme.palette.common.success = '#055B67'
theme.palette.common.error = '#F05D2F'
theme.palette.common.text = '#2C3E50'
theme.palette.common.textAdd = '#738891'
theme.palette.common.btnMiddle = '#7AB4CC'
theme.palette.common.btnLight = '#D3E8ED'
theme.palette.common.btnWhite = '#FFFFFF'
theme.palette.common.addDark = '#C00000'
theme.palette.common.addLight = '#F3B31D'
theme.palette.background.main = '#ECF1F0'
theme.palette.background.add = '#FFFBF4'
theme.palette.background.success = '#38ADA9'
theme.palette.background.error = '#FFE0CA'

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
