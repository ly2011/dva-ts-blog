import request from '../../../utils/request'

const BASE_URL = 'https://cnodejs.org/api/v1'

export const getArticles = (params = {}) => {
  return request({
    baseURL: BASE_URL,
    url: '/topics',
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params
  })
}
