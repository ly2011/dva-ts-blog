import { getArticles } from '../services/index'
export default {
  namespace: 'topics',
  state: {
    list: [],
    pagination: {
      current: 1,
      pageSize: 10,
      showSizeChanger: true,
      showQuickJumper: true,
      total: 2000,
      showTotal: total => `共 ${total} 条数据`
    }
  },
  effects: {
    *fetch({ payload, callback }, { call, put }) {
      const { current, pageSize, ...otherParams } = payload
      const params = {
        ...otherParams,
        page: current,
        limit: pageSize
      }
      try {
        const { data } = yield call(getArticles, params)
        yield put({
          type: 'save',
          payload: {
            data,
            pagination: {
              current,
              pageSize
            }
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
    }
  },
  reducers: {
    save(state, { payload = {} }: any) {
      const { pagination: oldPagination } = state
      const { data, pagination: { current, pageSize } } = payload
      return {
        ...state,
        list: data || [],
        pagination: {
          ...oldPagination,
          current,
          pageSize
        }
      }
    }
  }
}
