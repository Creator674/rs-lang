import { createMuiTheme } from '@material-ui/core/styles'
import theme from '../../layouts/theme'

const commonStyles = {
  boxSizing: 'border-box',
  padding: '0.4rem 1.1rem',
  fontSize: '1.6rem',
  lineHeight: '1.6rem',
  fontWeight: 'normal',
  fontFamily: theme.props.mainFont,
  borderRadius: '1.3rem',
  border: `none`,
}

export const hard = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        background: theme.palette.common.main,
        color: theme.palette.common.btnLight,

        '&:hover': {
          backgroundColor: theme.palette.common.success,
          color: theme.palette.background.success,
        },
      },
      outlined: {
        ...commonStyles,
      },
    },
  },
})

export const repeat = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        background: theme.palette.common.btnMiddle,
        color: theme.palette.common.main,

        '&:hover': {
          backgroundColor: theme.palette.background.success,
          color: theme.palette.common.success,
        },
      },
      outlined: {
        ...commonStyles,
      },
    },
  },
})

export const easy = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        background: theme.palette.common.btnLight,
        color: theme.palette.common.btnWhite,

        '&:hover': {
          backgroundColor: theme.palette.background.fadeSuccess,
          color: theme.palette.common.btnWhite,
        },
      },
      outlined: {
        ...commonStyles,
      },
    },
  },
})

export const answer = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        background: theme.palette.common.btnWhite,
        color: theme.palette.common.btnMiddle,

        '&:hover, &:focus': {
          backgroundColor: theme.palette.common.btnWhite,
          color: theme.palette.background.success,
          border: `1px solid ${theme.palette.background.success}`,
        },
      },
      outlined: {
        ...commonStyles,
        border: `1px solid ${theme.palette.common.btnMiddle}`,
        padding: '0.3rem 1.1rem',
      },
    },
  },
})
