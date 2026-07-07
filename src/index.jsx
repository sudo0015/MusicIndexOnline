import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import App from './App'
import { lightTheme, darkTheme } from './theme'
import useTheme from './hooks/useTheme'
import '@mdi/font/css/materialdesignicons.min.css'
import './App.css'

function Root() {
  const { mode, toggleMode } = useTheme()
  const theme = mode === 'dark' ? darkTheme : lightTheme
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App onToggleTheme={toggleMode} themeMode={mode} />
    </ThemeProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
)