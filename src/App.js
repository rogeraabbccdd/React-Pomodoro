import React from 'react'

// Import Materia UI components
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  CssBaseline
} from '@material-ui/core'

// Import theme and styles functions from Materia UI
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles'

// Import routes
import { Link } from 'react-router-dom'

import Routes from './routes.js'

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  }
})

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  }
}))

const links = [
  { to: '/list', name: '事項' },
  { to: '/settings', name: '設定' }
]

function App () {
  const classes = useStyles()

  return (
    <ThemeProvider theme={theme}>
      {/* Important! Must have CssBaseline to apply dark theme */}
      <CssBaseline />
      <div className={classes.root}>
        <AppBar position='static'>
          <Container>
            <Toolbar>
              <Button color='inherit' component={Link} to='/'>
                <Typography variant='h6'>番茄鐘</Typography>
              </Button>
              <div id='nav-links'>
                {
                  links.map((link, i) => (
                    <Button key={i} color='inherit' component={Link} to={link.to}>{link.name}</Button>
                  ))
                }
              </div>
            </Toolbar>
          </Container>
        </AppBar>
        <Container id='content'>
          <Routes />
        </Container>
      </div>
    </ThemeProvider>
  )
}

export default App
