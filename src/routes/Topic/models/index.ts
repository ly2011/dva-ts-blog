import { getArticleById } from '../services/index'
export default {
  namespace: 'topic',
  state: {
    topic: {}
  },
  effects: {
    *fetch({ payload, callback }, { call, put }) {
      const { id } = payload
      try {
        const { data } = yield call(getArticleById, id)
        yield put({
          type: 'save',
          payload: {
            data
          }
        })
        callback && callback(null, data)
      } catch (error) {
        callback &&
          callback({
            code: 500,
            msg: error.message || '请求出错'
          })
      }
    },
    *clear(_, { put }) {
      yield put({
        type: 'save',
        payload: { data: {} }
      })
    }
  },
  reducers: {
    save(state, { payload = {} }: any) {
      const { data } = payload
      return {
        ...state,
        topic: data || {}
      }
    }
  }
}
