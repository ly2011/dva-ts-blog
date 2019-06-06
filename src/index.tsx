import dva from 'dva'
import createLoading from 'dva-loading'
import { createBrowserHistory as createHistory } from 'history'
import { message } from 'antd'
import router from './router'
import './index.less'

const app = dva({
  history: createHistory(),
  onStateChange() {
    // window.__state__ = state
  },
  onError(error: any) {
    console.error(`全局error: ${error}`)
    message.error(`出错了: ${error}`)
  }
})

// 2. Plugins
app.use(createLoading({ effects: true }))

// 3. Model

// 4.Router
app.router(router)

// 5. start
app.start('#root')
