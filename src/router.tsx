import React from 'react'
import { Switch, Route, routerRedux } from 'dva/router'
import dynamic from 'dva/dynamic'
import { DvaInstance } from 'dva'

import * as H from 'history'
import App from './App'
import moment from 'moment'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
const { ConnectedRouter } = routerRedux

interface RoutersProps {
  history: H.History
  app: DvaInstance
}

const Routers = function({ history, app }: RoutersProps): JSX.Element {
  const error = dynamic({
    app,
    component: () => import('./routes/Error/index')
  })

  const routes = [
    {
      path: '/',
      models: () => [import('./routes/Home/models')],
      component: () => import('./routes/Home/index')
    },
    {
      path: '/home',
      models: () => [import('./routes/Home/models')],
      component: () => import('./routes/Home/index')
    },
    {
      path: '/topic/:id',
      models: () => [import('./routes/Topic/models')],
      component: () => import('./routes/Topic/index')
    },
    {
      path: '/about',
      // models: [],
      component: () => import('./routes/About/index')
    }
  ]

  return (
    <ConnectedRouter history={history}>
      <LocaleProvider locale={zhCN}>
        <App>
          <Switch>
            {/* <Route exact path="/" render={() => <Redirect from="/" to="/home" />} /> */}
            {routes.map(({ path, ...dynamics }, key) => (
              <Route
                key={key}
                exact
                path={path}
                component={dynamic({
                  app,
                  ...dynamics
                })}
              />
            ))}
            <Route component={error} />
          </Switch>
        </App>
      </LocaleProvider>
    </ConnectedRouter>
  )
}

export default Routers
