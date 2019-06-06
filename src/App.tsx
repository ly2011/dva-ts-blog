import React from 'react'
import { connect } from 'dva'
import { withRouter } from 'dva/router'

interface Props {
  children: React.ReactNode
  location: object
  dispatch: Function
  app: object
  loading: Boolean
}
const App: React.FC = (props: any) => {
  // console.log('app log ---> ', props)
  return (
    <div className="App">
      <header className="App-header" />
      {props.children}
    </div>
  )
}

export default withRouter(connect(({ app, loading }: Props) => ({ app, loading }))(App))
