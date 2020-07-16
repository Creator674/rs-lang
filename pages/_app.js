import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from '../layouts'
import GlobalState from '../context/GlobalState'

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode) jssStyles.parentNode.removeChild(jssStyles)
  }, [])
  return (
    <GlobalState>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </GlobalState>
  )
}

export default MyApp
