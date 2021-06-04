import React from 'react'

import {
  Switch,
  Route
} from 'react-router-dom'
import KeepAlive from 'react-activation'

import Home from './pages/Home.js'
import Settings from './pages/Settings.js'
import List from './pages/List.js'
import NoMatch from './pages/NoMatch.js'

const routes = [
  { name: 'settings', path: '/settings', component: Settings },
  { name: 'list', path: '/list', component: List },
  { name: 'home', path: '/', component: Home },
  { name: 'nomatch', path: '*', component: NoMatch }
]

function Routes () {
  return (
    <Switch>
      {
        routes.map((route, i) => (
          <Route
            key={i}
            path={route.path}
            exact
            render={props => (
              // pass the sub-routes down to keep nesting
              <KeepAlive name={route.name}><route.component /></KeepAlive>
            )}
          />
        ))
      }
    </Switch>
  )
}

export default Routes
