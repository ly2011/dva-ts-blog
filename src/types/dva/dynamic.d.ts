// https://narro.me/frontend/2018/12/04/dva-with-typescript(2).html
// https://github.com/dvajs/dva/issues/1758
import { DvaInstance } from 'dva'
import { ComponentType } from 'react'

declare const dynamic: (
  opts: {
    app: DvaInstance
    models?: () => Array<PromiseLike<any>>
    component: () => PromiseLike<any>
  }
) => ComponentType<any>
export default dynamic
